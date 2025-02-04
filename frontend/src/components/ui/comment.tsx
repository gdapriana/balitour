import {
  users_comment_cultures,
  users_comment_destinations,
  users_comment_stories
} from "@/lib/types.ts";
import {MessageCircle, Trash, TriangleAlert} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import moment from "moment";
import {Button} from "@/components/ui/button.tsx";
import Brand from "@/components/ui/brand.tsx";

const Comment = ({ comments }: { comments: users_comment_destinations[] | users_comment_cultures[] | users_comment_stories[] | undefined }) => {
  return (
    <div className="flex flex-col gap-8 justify-start items-stretch" >
      <h1 className="font-bold flex justify-start gap-1 items-center lg:text-2xl text-xl"><MessageCircle />Comment</h1>
      <div className="flex flex-col gap-8 justify-start items-stretch">
        {comments?.length === 0 && (
          <div className="h-40 flex justify-center items-center">
            <Brand headline="No Comment yet" direction="col" className={{icon: "w-10"}} />
          </div>
        )}
        {comments?.map((comment: users_comment_destinations | users_comment_cultures | users_comment_stories, index: number) => {
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