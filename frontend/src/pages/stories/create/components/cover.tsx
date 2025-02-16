import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input.tsx";

const Cover = ({
  cover,
}: {
  cover: { value: string | undefined; setValue: Dispatch<SetStateAction<string | undefined>> };
}) => {
  const [imageCover, setImageCover] = useState<File>();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col justify-start items-stretch gap-2">
      <h1 className="font-bold">Cover</h1>
      <div className="aspect-video overflow-hidden flex justify-center items-center bg-secondary rounded-2xl">
        {!selectedFile && <h3 className="font-bold text-muted-foreground">No Selected Image</h3>}
        {selectedFile && <img src={preview} alt="cover" className="w-full h-full object-cover" />}
      </div>
      <Input accept="image/png, image/gif, image/jpeg" onChange={onSelectFile} type="file" className="aspect-video" />
    </div>
  );
};

export default Cover;
