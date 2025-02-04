import {
  users_comment_cultures,
  users_comment_destinations,
  users_comment_stories
} from "@/lib/types.ts";
import {MessageCircle, Trash, TriangleAlert} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import Brand from "@/components/ui/brand.tsx";
import UserBtn from "@/components/ui/user-btn.tsx";
import moment from "moment";

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
                <UserBtn avatarOnly={false} username={comment.username} className={{root: "px-0", username: "font-bold text-lg"}} isOpen={false} />
                <p className="text-muted-foreground line-clamp-1">{moment(comment.createdAt).fromNow()}</p>
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