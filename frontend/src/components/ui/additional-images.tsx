import {Image} from "@/lib/types.ts";
import {ImagesIcon} from "lucide-react";
import AdditionalImageDialog from "@/components/ui/additional-image-dialog.tsx";

const AdditionalImages = ({images, itemName}:{images: Image[] | undefined; itemName: string | undefined}) => {
  return (
    <div className="w-full flex flex-col gap-4 justify-start items-stretch">
      <header>
        <h1 className="font-bold flex justify-start gap-1 items-center lg:text-2xl text-xl">
          <ImagesIcon />
         Additional Images
        </h1>
      </header>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {images?.map((image: Image, index: number) => {
          return (
            <AdditionalImageDialog url={image.url} itemName={itemName} key={index} />
          )
        })}
      </div>
    </div>
  );
};

export default AdditionalImages;