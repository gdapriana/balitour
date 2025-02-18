import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { DialogFooter } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import { AuthContext } from "@/provider/auth.tsx";

const DeleteItemAlert = ({
  title,
  object,
  slug,
  children,
}: {
  title: string;
  object: "destinations" | "cultures" | "stories";
  slug: string;
  children: ReactNode;
}) => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const clickHandle = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API}/${object}/${slug}`, {
        method: "DELETE",
        headers: { Authorization: token! },
      });
      if (response.ok) navigate(0);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete</AlertDialogTitle>
          <AlertDialogDescription>Are you sure to delete {title}?</AlertDialogDescription>
        </AlertDialogHeader>
        <DialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={clickHandle}>Yes</Button>
          </AlertDialogAction>
        </DialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteItemAlert;
