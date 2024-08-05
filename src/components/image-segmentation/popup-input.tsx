import { FieldInput } from "@/lib/settings-types";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = FieldInput & {
  defaultValue?: string;
  onValueChange: (value: string) => void;
};

export default function PopupInput({
  label,
  isTranslatable,
  placeholder,
  fieldType,
  defaultValue,
  onValueChange,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex justify-between items-center mb-1">
        <Label>{isTranslatable ? t(label) : label}</Label>
      </div>
      <Input
        type={fieldType}
        value={defaultValue ?? ""}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={
          placeholder && (isTranslatable ? t(placeholder) : placeholder)
        }
      />
    </div>
  );
}
