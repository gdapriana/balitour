import {Destination, users_comment_destinations} from "@/lib/types.ts";
import {MessageCircle, Trash, TriangleAlert} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import moment from "moment";
import {Button} from "@/components/ui/button.tsx";

const Comment = ({ destination }: { destination: Destination | undefined }) => {
  return (
    <div className="flex flex-col gap-8 justify-start items-stretch" >
      <h1 className="font-bold flex justify-start gap-1 items-center lg:text-2xl text-xl"><MessageCircle />Comment</h1>
      <div className="flex flex-col gap-8 justify-start items-stretch">
        {destination?.users_comment_destinations.map((comment: users_comment_destinations, index: number) => {
          return (
            <article key={index} className="flex gap-6 border-b py-6 flex-col justify-start items-stretch">
              <div className="flex justify-start items-center">
                <div className="flex gap-4 justify-center items-center">
                  <Avatar>
                    <AvatarImage src={comment.user?.profilePicture || ""} />
                    <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex justify-center gap-2 items-start">
                    <p className="font-bold line-clamp-1">{comment.username}</p>
                    <p className="text-muted-foreground line-clamp-1"> | {moment(comment.createdAt).fromNow()}</p>
                  </div>
                </div>
              </div>
              <p>{comment.body}</p>
              <div className="flex gap-2 justify-end items-center">
                <Button variant="outline" className="rounded-full" size="sm">
                  <TriangleAlert />
                  <span className="hidden sm:inline">Report</span>
                </Button>
                <Button variant="outline" className="rounded-full" size="sm">
                  <Trash />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  );
};

export default Comment;