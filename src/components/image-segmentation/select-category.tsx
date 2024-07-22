"use client"

import { ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { Button } from "../ui/button"
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandList
} from "../ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import CategoryList from "./category-list"

type Category = {
    value: string;
    label: string;
    image?: string;
    children?: Category[];
}

const categories: Category[] = [
    {
        value: "single",
        label: "Single",
        children: [
            {
                label: "Microparticule",
                value: "microparticule",
                image: "/annotations/microparticule.png"
            },
            {
                label: "Simple plate",
                value: "simple_plate",
                image: "/annotations/simple_plate.png"
            },
            {
                label: "Fan-like plate",
                value: "fan_like_plate",
                image: "/annotations/fan_like_plate.png"
            },
            {
                label: "Dentrite plate",
                value: "dentrite_plate",
                image: "/annotations/dentrite_plate.png"
            },
            {
                label: "Fern-like dentrite plate",
                value: "fern_like_dentrite_plate",
                image: "/annotations/fern_like_dentrite_plate.png"
            },
            {
                label: "Column/Square",
                value: "column_square",
                image: "/annotations/column_square.png"
            },
            {
                label: "Singular Irregular",
                value: "singular_irregular",
                image: "/annotations/singular_irregular.png"
            },
            {
                label: "Cloud-particle",
                value: "cloud_particle",
                image: "/annotations/cloud_particle.png"
            }
        ]
    },
    {
        value: "multiple",
        label: "Multiple",
        children: [
            {
                label: "Combinations",
                value: "combinations",
                image: "/annotations/combinations.png"
            },
            {
                label: "Double plate",
                value: "double_plate",
                image: "/annotations/double_plate.png"
            },
            {
                label: "Multiple Columns/Squares",
                value: "multiple_columns_squares",
                image: "/annotations/multiple_columns_squares.png"
            },
            {
                label: "Multiple Irregulars",
                value: "multiple_irregulars",
                image: "/annotations/multiple_irregulars.png",
                children: [
                    {
                        label: "Multiple irregulars 1",
                        value: "multiple_irregulars_1"
                    },
                    {
                        label: "Multiple irregulars 2",
                        value: "multiple_irregulars_2"
                    },
                    {
                        label: "Multiple irregulars 3",
                        value: "multiple_irregulars_3"
                    },
                ]
            }
        ]
    },
    {
        value: "undefined",
        label: "Undefined",
        children: [
            {
                label: "Undefined",
                value: "undefined",
                image: "/annotations/undefined.png"
            }
        ]
    }
]

type Props = {
    value: string;
    setValue: (value: string) => void;
}

export function SelectCategory({ value, setValue }: Props) {
    const [open, setOpen] = React.useState(false)

    const findCategory = (categories: Category[], value: string): Category|null => {
        for (const category of categories) {
            if (category.children) {
                const findItem = findCategory(category.children, value);
                if (findItem) return findItem;
            } else if (category.value === value) {
                return category;
            }
        }

        return null;
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {value
                        ? findCategory(categories, value)?.label
                        : "Select category..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="sm:w-[250px] p-0 pointer-events-auto">
                <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CategoryList categories={categories} value={value} setValue={(value) => {
                            setOpen(false)
                            setValue(value)
                        }} />
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}