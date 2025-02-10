import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Heart } from "lucide-react";

const LikeAlert = ({
  object,
  slug,
  itemName,
  token,
  likedCount,
}: {
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.ok) {
        navigate(0);
      } else {
        console.error("like failed");
      }
    } catch (error) {
      console.error(`An error occurred during like ${itemName}`, error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full">
          <Heart />
          {likedCount} <span className="hidden md:inline">Users liked</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Like {object.slice(0, -1)}</AlertDialogTitle>
          <AlertDialogDescription>Are you sure to like {itemName}?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button className="rounded-full" variant="outline">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button className="rounded-full" onClick={submitHandle}>
              Yes
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LikeAlert;
