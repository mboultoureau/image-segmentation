import { useEffect, useState } from 'react';
import './App.css';
import ImageSegmentation from './components/image-segmentation/image-segmentation';
import { Button } from './components/ui/button';
import { Skeleton } from './components/ui/skeleton';
import { Toaster } from './components/ui/toaster';

function App() {

  const [image, setImage] = useState<string>("");
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    fetch("/api/task.json")
      .then((response) => response.json())
      .then((data) => {
        setImage(data.image);
        setAnnotations(data?.data ?? []);
      });
  }, [])

  return (
    <div className="m-10">
      {image !== "" ? (
        <ImageSegmentation image={image} annotations={annotations} />
      ) : (
        <>
          <div className="mx-auto flex justify-between w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Image segmentation</h1>
            <Button disabled>Next task</Button>
          </div>
          <Skeleton className="h-[70vh] w-full rounded-xl mt-8" />
        </>
      )}
      <Toaster />
    </div>
  );
}

export default App;
