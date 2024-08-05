import { FieldSlider } from "@/lib/settings-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

type Props = FieldSlider & {
  defaultValue: number;
  onValueChange: (value: number) => void;
};

export default function PopupSlider({
  min,
  max,
  step,
  label,
  isTranslatable,
  stepLabels,
  defaultValue,
  onValueChange,
}: Props) {
  const [value, setValue] = useState<number>(defaultValue);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex justify-between items-center mb-1">
        <Label>{isTranslatable ? t(label) : label}</Label>
        {stepLabels && (
            <p className="text-sm leading-none">
                {isTranslatable ? t(stepLabels[value]) : stepLabels[value]}
            </p>
        )}
      </div>
      <Slider
        value={[value]}
        defaultValue={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(value) => {
            setValue(value[0])
            onValueChange(value[0])
        }}
      />
    </div>
  );
}
