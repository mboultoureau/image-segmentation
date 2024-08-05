import { AlertCircle, Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import { settings } from "../../lib/settings";
import { Annotations, Field } from "../../lib/settings-types";
import { cn } from "../../lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import PopupInput from "./popup-input";
import PopupSelect from "./popup-select";
import PopupSlider from "./popup-slider";
import PopupTextarea from "./popup-textarea";

type Props = {
  onCancel: () => void;
  onValidate: (annotation: any) => void;
  onDelete: (annotation: any) => void;
  currentSelection: any;
};

export default function Popup({
  onCancel,
  onValidate,
  onDelete,
  currentSelection,
}: Props) {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const getInitialData = () => {
    return settings.popup.fields.map((field: Field) => {
      return {
        id: field.id,
        value: field.defaultValue ?? undefined,
      };
    });
  };

  // Merge the initial data with the current selection
  const currentData = currentSelection.body as any[];
  const initialData = getInitialData().map((item) => {
    const current = currentData.find((d) => d.id === item.id);
    return {
      ...item,
      value: current?.value ?? item.value,
    };
  });

  const [data, setData] = useState<Annotations>(initialData);

  const onValueChange = (id: string, value: any) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            value,
          };
        }
        return item;
      });
    });
  };

  const valideInputs = () => {
    const requiredFields = settings.popup.fields.filter(
      (field) => field.required
    );
    const missingFields = requiredFields.filter(
      (field) => !data.find((d) => d.id === field.id)?.value
    );

    if (missingFields.length) {
      setError(t("missing_fields"));
      return false;
    }

    return true;
  }

  return (
    <Card className="w-[300px] absolute top-0 bottom-0 m-auto h-fit left-0 right-0 z-50">
      <CardContent>
        <form className="mt-4">
          {error && <Alert variant="destructive" className="mb-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('error_title')}</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>}
          <div className="grid w-full items-center gap-2">
            {settings.popup.fields.map((field, index) => (
              <Fragment key={index}>
                {field.type === "slider" && (
                  <PopupSlider
                    {...field}
                    defaultValue={data.find((d) => d.id === field.id)?.value}
                    onValueChange={(value) => onValueChange(field.id, value)}
                  />
                )}
                {field.type === "textarea" && (
                  <PopupTextarea
                    {...field}
                    defaultValue={data.find((d) => d.id === field.id)?.value}
                    onValueChange={(value) => onValueChange(field.id, value)}
                  />
                )}
                {field.type === "input" && (
                  <PopupInput
                    {...field}
                    defaultValue={data.find((d) => d.id === field.id)?.value}
                    onValueChange={(value) => onValueChange(field.id, value)}
                  />
                )}
                {field.type === "select" && (
                  <PopupSelect
                    {...field}
                    defaultValue={data.find((d) => d.id === field.id)?.value}
                    onValueChange={(value) => onValueChange(field.id, value)}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter
        className={cn(
          "flex",
          currentSelection.id ? "justify-between" : "justify-end"
        )}
      >
        {currentSelection.id && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(currentSelection)}
          >
            <Trash />
          </Button>
        )}

        <div>
          <Button variant="outline" className="mr-2" onClick={onCancel}>
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              setError(null);
              if (!valideInputs()) return;

              currentSelection.body = data;
              onValidate(currentSelection);
            }}
          >
            {t("validate")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
