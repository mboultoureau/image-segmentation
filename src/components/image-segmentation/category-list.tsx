import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { CommandGroup, CommandItem } from "../ui/command";

type Category = {
    value: string;
    label: string;
    image?: string;
    children?: Category[];
}

type Props = {
    categories: Category[];
    value?: string;
    setValue: (value: string) => void;
}

export default function CategoryList({ categories, value, setValue }: Props) {
    return (
        <>
            {categories.map((category) => {
                if (category.children) {
                    return (
                        <CommandGroup heading={category.label} className="ml-2" key={category.value}>
                            <CategoryList categories={category.children} value={value} setValue={setValue} />
                        </CommandGroup>
                    )
                }

                return (
                    <CommandItem
                        key={category.value}
                        value={category.value}
                        onSelect={(currentValue) => setValue(currentValue)}
                    >
                        <Check
                            className={cn(
                                "mr-2 h-4 w-4",
                                value === category.value ? "opacity-100" : "opacity-0"
                            )}
                        />
                        {category.label}
                    </CommandItem>
                )
            })}
        </>
    )
}