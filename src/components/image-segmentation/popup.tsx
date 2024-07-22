import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { SelectCategory } from "./select-category";

type Props = {
    onCancel: () => void;
    onValidate: (annotation: any) => void;
    onDelete: (annotation: any) => void;
    currentSelection: any;
}

export default function Popup({ onCancel, onValidate, onDelete, currentSelection }: Props) {
    // const defaultCategory = currentSelection?.body?.find((item: any) => item.key === "category")?.value
    // const defaultQuality = currentSelection?.body?.find((item: any) => item.key === "quality")?.value
    // const defaultConfidence = currentSelection?.body?.find((item: any) => item.key === "confidence")?.value

    const [category, setCategory] = useState("")
    const [quality, setQuality] = useState(2)
    const [confidence, setConfidence] = useState(2)

    useEffect(() => {
        setCategory(currentSelection?.body?.find((item: any) => item.key === "category")?.value ?? "");
        setQuality(currentSelection?.body?.find((item: any) => item.key === "quality")?.value ?? 2);
        setConfidence(currentSelection?.body?.find((item: any) => item.key === "confidence")?.value ?? 2);
    }, [currentSelection])

    const qualities = [
        "Not good",
        "Soso",
        "Average",
        "Good"
    ]
    
    const confidences = [
        "Not at all confident",
        "Not too confident",
        "Almost confident",
        "100% confident"
    ]

    return (
        <Card className="w-[300px] absolute top-0 bottom-0 m-auto h-fit left-0 right-0 z-50">
            <CardContent>
                <form className="mt-4">
                    <div className="grid w-full items-center gap-2">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="category">Category</Label>
                            <SelectCategory
                                value={category}
                                setValue={setCategory}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <div className="flex justify-between items-center mb-1">
                                <Label htmlFor="quality">Quality</Label>
                                <p className="text-sm leading-none">{qualities[quality]}</p>
                            </div>
                            <Slider value={[quality]} defaultValue={[quality]} max={3} step={1} onValueChange={(value) => setQuality(value[0])} />
                        </div>
                        <div className="flex flex-col space-y-1.5 mt-2">
                            <div className="flex justify-between items-center mb-1">
                                <Label htmlFor="confidence" className="mb-1">Confidence</Label>
                                <p className="text-sm leading-none">{confidences[confidence]}</p>
                            </div>
                            <Slider value={[confidence]} defaultValue={[confidence]} max={3} step={1} onValueChange={(value) => setConfidence(value[0])} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className={cn("flex", currentSelection.id ? "justify-between" : "justify-end")}>
                {currentSelection.id && (
                    <Button variant="destructive" size="icon" onClick={() => onDelete(currentSelection)}>
                        <Trash />
                    </Button>
                )}

                <div>
                    <Button variant="outline" className="mr-2" onClick={onCancel}>Cancel</Button>
                    <Button onClick={() => {
                        if (!category) return;

                        currentSelection.body = [
                            {
                                key: "category",
                                value: category
                            },
                            {
                                key: "quality",
                                value: quality
                            },
                            {
                                key: "confidence",
                                value: confidence
                            }
                        ]

                        onValidate(currentSelection)
                    }}>Validate</Button>
                </div>
            </CardFooter>
        </Card>
    )
}