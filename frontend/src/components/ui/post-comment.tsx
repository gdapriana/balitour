import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter, DialogClose
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {FormEvent} from "react";
import {useNavigate} from "react-router-dom";

const PostComment = ({to, object, slug, token}: {to: string, object: "destinations" | "cultures" | "stories"; slug: string; token: string}) => {
  const navigate = useNavigate()
  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API}/${object}/${slug}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ body: e.currentTarget.text.value }),
      });
      if (response.ok) {
        navigate(0)
      } else {
        console.error("post failed");
      }
    } catch (error) {
      console.error("An error occurred during post comment", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <Plus />
          Post Comment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comment to {to}</DialogTitle>
          <DialogDescription>
            Please do not comment racism
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandle} action="" className="flex flex-col justify-start items-stretch gap-4">
          <Textarea minLength={3} name="text" />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-full">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="rounded-full">Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostComment;