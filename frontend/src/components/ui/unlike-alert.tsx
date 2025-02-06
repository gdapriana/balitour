import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Heart} from "lucide-react";

const UnlikeAlert = ({object, slug, itemName, token, likedCount}: {
  object: "destinations" | "cultures" | "stories";
  slug: string | undefined;
  itemName: string | undefined;
  token: string;
  likedCount: number | undefined;
}) => {
  const navigate = useNavigate();

  const submitHandle = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API}/${object}/${slug}/like`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
      });
      if (response.ok) {
        navigate(0)
      } else {
        console.error("unlike failed");
      }
    } catch (error) {
      console.error(`An error occurred during unlike ${itemName}`, error);
    }

  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full"><Heart fill="red" color="red"  />{likedCount} <span className="hidden md:inline">Users liked</span></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unlike {object.slice(0, -1)}</AlertDialogTitle>
          <AlertDialogDescription>Are you sure to remove {itemName} from liked?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button className="rounded-full" variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button className="rounded-full" onClick={submitHandle}>Yes</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnlikeAlert;