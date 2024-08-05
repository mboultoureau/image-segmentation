import { MousePointer2, PenTool, RectangleHorizontal, View, ZoomIn, ZoomOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Separator } from "../ui/separator";
import ToolbarItem from "./toolbar-item";

type Props = {
    selectedTool: string;
    onButtonClicked: (button: string) => void;
}

export default function Toolbar({ selectedTool, onButtonClicked }: Props) {

    const { t } = useTranslation();

    const drawingTools = [
        {
            value: 'mouse',
            label: t('mouse'),
            icon: MousePointer2
        },
        {
            value: 'rectangle',
            label: t('rectangle'),
            icon: RectangleHorizontal
        },
        {
            value: 'polygon',
            label: t('polygon'),
            icon: PenTool
        }
    ]
    
    const buttons = [
        {
            value: 'zoom-in',
            label: t('zoom_in'),
            icon: ZoomIn
        },
        {
            value: 'zoom-out',
            label: t('zoom_out'),
            icon: ZoomOut
        },
        {
            value: 'fit-view',
            label: t('fit_view'),
            icon: View
        },
        // {
        //     value: 'fullscreen',
        //     label: 'Fullscreen',
        //     icon: Maximize
        // }
    ]

    return (
        <div className="flex items-center gap-2 absolute bg-background rounded-lg bottom-2 left-0 right-0 mx-auto z-[1] p-2 w-[313px]">
            {drawingTools.map((tool) => (
                <ToolbarItem
                    selected={selectedTool === tool.value}
                    key={tool.value}
                    label={tool.label}
                    icon={tool.icon}
                    onClick={() => onButtonClicked(tool.value)}
                />
            ))}
            <Separator orientation="vertical" className="mx-1 h-6" />
            {buttons.map((button) => (
                <ToolbarItem
                    key={button.value}
                    label={button.label}
                    icon={button.icon}
                    onClick={() => onButtonClicked(button.value)}
                />
            ))}
        </div>
    )
}