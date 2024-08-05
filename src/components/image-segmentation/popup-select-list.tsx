import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
import { CommandGroup, CommandItem } from "../ui/command";

type Option = {
  value: string;
  label: string;
  image?: string;
  children?: Option[];
};

type Props = {
  options: Option[];
  value?: string;
  setValue: (value: string) => void;
  isTranslatable?: boolean;
  useParentAsGroup?: boolean;
  level?: number;
};

export default function PopupSelectList({
  options,
  value,
  setValue,
  isTranslatable,
  useParentAsGroup,
  level = 0,
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      {options.map((option) => {
        if (option.children && useParentAsGroup) {
          return (
            <CommandGroup
              heading={isTranslatable ? t(option.label) : option.label}
              className="ml-2"
              key={option.value}
            >
              <PopupSelectList
                options={option.children}
                value={value}
                setValue={setValue}
                isTranslatable={isTranslatable}
              />
            </CommandGroup>
          );
        }

        return (
          <Fragment key={option.value}>
            <CommandItem
              value={option.value}
              onSelect={(currentValue) => setValue(currentValue)}
              style={{ paddingLeft: `${4 + level * 10}px` }}
              keywords={[isTranslatable ? t(option.label) : option.label]}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === option.value ? "opacity-100" : "opacity-0"
                )}
              />
              {isTranslatable ? t(option.label) : option.label}
            </CommandItem>
            {option.children && (
              <PopupSelectList
                options={option.children}
                value={value}
                setValue={setValue}
                isTranslatable={isTranslatable}
                level={level + 1}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
}
