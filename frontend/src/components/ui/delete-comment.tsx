import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash} from "lucide-react";
import {useNavigate} from "react-router-dom";

const DeleteComment = ({ token, object, slug, id}: {
  token: string;
  object: "destinations" | "cultures" | "stories";
  slug: string;
  id: string;
}) => {
  const navigate = useNavigate();
  const submitHandle = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API}/${object}/${slug}/comment/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
      });
      if (response.ok) {
        navigate(0)
      } else {
        console.error("delete failed");
      }
    } catch (error) {
      console.error("An error occurred during delete comment", error);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="rounded-full" size="sm">
          <Trash />
          <span className="hidden sm:inline">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Comment</AlertDialogTitle>
          <AlertDialogDescription>Are you sure to delete comment?</AlertDialogDescription>
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

export default DeleteComment;