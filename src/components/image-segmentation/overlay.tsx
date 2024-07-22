import Popup from "./popup";
import Toolbar from "./toolbar";

type Props = {
    onButtonClicked: (button: string) => void,
    selectedTool: string;
    popupVisible: boolean;
    onCancel: () => void;
    onValidate: (annotation: any) => void;
    onDelete: (annotation: any) => void;
    currentSelection: any;
}

export default function Overlay({
    onButtonClicked,
    selectedTool,
    popupVisible,
    onCancel,
    onValidate,
    onDelete,
    currentSelection,
}: Props) {

    return (
        <div id="overlay" className="w-full h-full">
            {popupVisible && (
                <Popup
                    onCancel={onCancel}
                    onValidate={onValidate}
                    onDelete={onDelete}
                    currentSelection={currentSelection}
                />
            )}
            <Toolbar
                selectedTool={selectedTool}
                onButtonClicked={onButtonClicked}
            />
        </div>
    )
}