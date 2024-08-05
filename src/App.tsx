import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageSegmentation from "./components/image-segmentation/image-segmentation";
import { Button } from "./components/ui/button";
import { Skeleton } from "./components/ui/skeleton";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";

function App() {
  const [image, setImage] = useState<string>("");
  const [annotations, setAnnotations] = useState([]);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const root = document.getElementById("root") as HTMLElement;
    const input = root.dataset.input;

    if (input) {
      const data = JSON.parse(input);
      setImage(data.image);
      setAnnotations(data?.data ?? []);
    } else {
      console.error(
        "The attribute 'data-input' is missing from the root element."
      );
      toast({
        title: "An error occurred",
        description: "No input data found. Please contact your administrator.",
        variant: "destructive",
      });
    }
  }, []);

  return (
    <div className="m-10">
      {image !== "" ? (
        <ImageSegmentation image={image} annotations={annotations} />
      ) : (
        <>
          <div className="mx-auto flex justify-between w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">{t('image_segmentation')}</h1>
            <Button disabled>{t('next')}</Button>
          </div>
          <Skeleton className="h-[70vh] w-full rounded-xl mt-8" />
        </>
      )}
      <Toaster />
    </div>
  );
}

export default App;
