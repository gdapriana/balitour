import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";

const AdditionalImageDialog = ({ url, itemName }: {url: string | undefined; itemName: string | undefined}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <img src={url} alt="additional-image" className="aspect-video grayscale hover:grayscale-0 transition duration-1000 object-cover rounded-2xl" />
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Additional image from {itemName}</DialogTitle>
        </DialogHeader>
        <img src={url} alt="additional-image" className="aspect-video object-cover" />
      </DialogContent>
    </Dialog>
  );
};

export default AdditionalImageDialog;