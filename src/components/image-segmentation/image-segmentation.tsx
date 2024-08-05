'use client'

import { settings } from '../../lib/settings';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
// @ts-ignore
import BetterPolygon from '@recogito/annotorious-better-polygon';
// @ts-ignore
import * as Annotorious from '@recogito/annotorious-openseadragon';
import '@recogito/annotorious-openseadragon/dist/annotorious.min.css';
import OpenSeadragon from 'openseadragon';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import '../../styles/image-segmentation.css';
import Overlay from './overlay';

type Props = {
    image: string;
    annotations: any;
}

export default function ImageSegmentation({ image, annotations }: Props) {
    const [selectedTool, setSelectedTool] = useState<string>("mouse")
    const [viewer, setViewer] = useState<OpenSeadragon.Viewer | null>(null)
    let [annotate, setAnnotate]: [any, any] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false)
    const [selection, setSelection] = useState<any>(null);
    const [edition, setEdition] = useState(null);
    const { toast } = useToast();
    const { t } = useTranslation();

    useEffect(() => {
        setSelection({
            ...selection,
            target: edition
        })
    }, [edition])

    const formatter = (annotation: any) => {
        const annotationCategory = annotation.bodies.find((b: any) => b.id === "category");

        if (annotationCategory) {
            const category = settings.category.categories.find((c) => c.value === annotationCategory.value);
            if (!category) return;

            const label = settings.category.isTranslatable ? t(category.label) : category.label;
            const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
            foreignObject.innerHTML = `
                <label
                    xmlns="http://www.w3.org/1999/xhtml"
                    style="border-color: ${category.outerColor}; background-color: ${category.outerColor}"
                >
                    ${label}
                </label>
            `;

            return {
                element: foreignObject,
                style: `fill: ${category.innerColor}; stroke: ${category.outerColor}; stroke-width: 2;`
            };
        }
    }

    useEffect(() => {
        const viewerInstance = OpenSeadragon({
            id: 'viewer',
            toolbar: 'overlay',
            tileSources: image,
            showNavigationControl: false
        } as any);

        setViewer(viewerInstance)

        const config = {
            formatters: formatter,
            disableEditor: true
        };

        const annotorious = Annotorious(viewerInstance, config)
        setAnnotate(annotorious);
        BetterPolygon(annotorious);

        annotations.forEach((annotation: any) => {
            annotorious.addAnnotation(annotation, false)
        });

        annotorious.on('createSelection', function (annotation: any) {
            setPopupVisible(true)
            setSelection(annotation);
        });

        annotorious.on('selectAnnotation', function (annotation: any) {
            setSelection(annotation);
            setPopupVisible(true)
        });

        annotorious.on('changeSelectionTarget', function (target: any) {
            setEdition(target)
        });

        annotorious.on('cancelSelected', function (point: any) {
            setSelection(null);
            setPopupVisible(false)
            setSelectedTool("mouse")
            annotorious.setDrawingEnabled(false);
        });

        annotorious.on('createAnnotation', function (annotation: any) {
            setSelectedTool("mouse")
            annotorious.setDrawingEnabled(false);
            setSelection(null);
        });

        return () => {
            viewerInstance?.destroy();
            setViewer(null)
        };
    }, []);

    const onButtonClicked = (button: string) => {
        switch (button) {
            case "fullscreen":
                viewer?.setFullScreen(!(viewer as any)?.isFullScreen())
                break;
            case "fit-view":
                viewer?.viewport.fitBounds(viewer.viewport.getHomeBounds());
                break;
            case "zoom-in":
                viewer?.viewport.zoomTo(Math.min(viewer.viewport.getZoom() + 1, viewer.viewport.getMaxZoom()))
                break;
            case "zoom-out":
                viewer?.viewport.zoomTo(Math.max(viewer.viewport.getZoom() - 1, viewer.viewport.getMinZoom()))
                break;
            case "mouse":
                setSelection(null);
                setSelectedTool("mouse")
                annotate.setDrawingEnabled(false);
                annotate.cancelSelected();
                setPopupVisible(false)
                break;
            case "rectangle":
                setSelection(null);
                setSelectedTool("rectangle")
                annotate.setDrawingEnabled(true);
                annotate.setDrawingTool("rect")
                annotate.cancelSelected();
                setPopupVisible(false)
                break;
            case "polygon":
                setSelection(null);
                setSelectedTool("polygon")
                annotate.setDrawingEnabled(true);
                annotate.setDrawingTool("polygon")
                annotate.cancelSelected();
                setPopupVisible(false)
                break;
        }
    }

    const onCancel = () => {
        setSelectedTool("mouse")
        setPopupVisible(false)
        annotate.setDrawingEnabled(false);
        annotate.cancelSelected();
        setSelection(null);
    }

    const onDelete = async (annotation: any) => {
        setSelectedTool("mouse")
        setPopupVisible(false)
        annotate.setDrawingEnabled(false);
        annotate.cancelSelected();
        setSelection(null);

        await annotate.removeAnnotation(annotation)
    }

    const onValidate = async (previous: any) => {
        setSelectedTool("mouse")
        setPopupVisible(false)
        annotate.setDrawingEnabled(false);
        annotate.cancelSelected();

        if (previous.id) {
            await annotate.updateSelected(previous);
            annotate.saveSelected();
        } else {
            const annotation = {
                ...previous,
                type: "Annotation",
                id: `#${uuid()}`
            };

            annotate.addAnnotation(annotation, false)
        }

        setSelection(null);
    }

    const onNextTask = () => {
        const annotations = annotate.getAnnotations();
        const result = {
            "image": image,
            "data": annotations
        }

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] max-h-[500px] rounded-md bg-slate-950 p-4 overflow-scroll select-text">
                    <code className="text-white">{JSON.stringify(result, null, 2)}</code>
                </pre>
            ),
        });
    }

    return (
        <>
            <div className="mx-auto flex justify-between w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">{t('image_segmentation')}</h1>
                <Button onClick={onNextTask}>{t('next_task')}</Button>
            </div>
            <div className="relative h-full w-full my-8">
                <Overlay
                    onValidate={onValidate}
                    onCancel={onCancel}
                    onDelete={onDelete}
                    onButtonClicked={onButtonClicked}
                    selectedTool={selectedTool}
                    popupVisible={popupVisible}
                    currentSelection={selection}
                />
                <div style={{ position: "relative", height: "70vh", zIndex: "0" }} id="viewer" className="seadragon-viewer" />
            </div>
        </>
    );
};