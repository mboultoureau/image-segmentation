import { MousePointer2, PenTool, RectangleHorizontal, View, ZoomIn, ZoomOut } from "lucide-react";
import { Separator } from "../ui/separator";
import ToolbarItem from "./toolbar-item";

type Props = {
    selectedTool: string;
    onButtonClicked: (button: string) => void;
}

export default function Toolbar({ selectedTool, onButtonClicked }: Props) {



    const drawingTools = [
        {
            value: 'mouse',
            label: 'Mouse',
            icon: MousePointer2
        },
        {
            value: 'rectangle',
            label: 'Rectangle',
            icon: RectangleHorizontal
        },
        {
            value: 'polygon',
            label: 'Polygon',
            icon: PenTool
        }
    ]
    
    const buttons = [
        {
            value: 'zoom-in',
            label: 'Zoom in',
            icon: ZoomIn
        },
        {
            value: 'zoom-out',
            label: 'Zoom out',
            icon: ZoomOut
        },
        {
            value: 'fit-view',
            label: 'Fit view',
            icon: View
        },
        // {
        //     value: 'fullscreen',
        //     label: 'Fullscreen',
        //     icon: Maximize
        // }
    ]

    return (
        <div className="flex items-center gap-2 absolute bg-background rounded-lg bottom-2 left-0 right-0 mx-auto z-[1] p-2 w-[313px] absolute">
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