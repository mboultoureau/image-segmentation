import { FieldSelect } from "@/lib/settings-types";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandInput, CommandList } from "../ui/command";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import PopupSelectList from "./popup-select-list";

type Props = FieldSelect & {
  defaultValue?: string;
  onValueChange: (value: string) => void;
};

interface SearchIndex {
  [key: string]: string;
}

export default function PopupSelect({
  label,
  options,
  defaultValue,
  onValueChange,
  isTranslatable,
  selectLabel,
  emptyLabel,
  searchLabel,
  useParentAsGroup
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const { t } = useTranslation();

  const getLabel = (value: string | undefined): string => {
    console.log(value)
    if (value !== undefined) {
      return isTranslatable ? t(value) : value;
    }
    if (selectLabel !== undefined) {
      return isTranslatable ? t(selectLabel) : selectLabel;
    }
    return t("selectDefault");
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <Label>{isTranslatable ? t(label) : label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between max-w-[250px]"
          >
            <p className="max-w-full text-ellipsis overflow-hidden">{getLabel(value)}</p>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="sm:w-[250px] p-0 pointer-events-auto">
          <Command>
            <CommandInput
              placeholder={
                searchLabel
                  ? (isTranslatable
                    ? t(searchLabel)
                    : searchLabel)
                  : t("selectSearch")
              }
            />
            <CommandList>
              <CommandEmpty>
                {emptyLabel
                  ? (isTranslatable
                    ? t(emptyLabel)
                    : emptyLabel)
                  : t("selectEmpty")}
              </CommandEmpty>
              <PopupSelectList
                isTranslatable={isTranslatable}
                useParentAsGroup={useParentAsGroup}
                options={options}
                value={value}
                setValue={(value) => {
                  setOpen(false);
                  setValue(value);
                  onValueChange(value);
                }}
              />
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
