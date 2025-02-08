import {
  users_comment_cultures,
  users_comment_destinations,
  users_comment_stories
} from "@/lib/types.ts";
import {MessageCircle, Plus, TriangleAlert} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import Brand from "@/components/ui/brand.tsx";
import UserBtn from "@/components/ui/user-btn.tsx";
import moment from "moment";
import {useContext} from "react";
import {AuthContext} from "@/provider/auth.tsx";
import {Link} from "react-router-dom";
import PostComment from "@/components/ui/post-comment.tsx";
import DeleteComment from "@/components/ui/delete-comment.tsx";

const Comment = ({ comments, itemName, slug, object }: {
  comments: users_comment_destinations[] | users_comment_cultures[] | users_comment_stories[] | undefined;
  itemName: string;
  slug: string;
  object: "destinations" | "cultures" | "stories";
}) => {
  const { user, authenticated, token } = useContext(AuthContext);
  return (
    <div id="comment" className="flex flex-col gap-8 justify-start items-stretch" >
      <div className="flex items-center justify-between">
        <h1 className="font-bold flex justify-start gap-1 items-center lg:text-2xl text-xl"><MessageCircle/>Comment</h1>
        {authenticated ? (
          <PostComment token={token || ""} slug={slug} object={object} to={itemName} />
        ): (
          <Button asChild className="rounded-full">
            <Link to="/login">
              <Plus />
              Post Comment
            </Link>
          </Button>
        )}
      </div>
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
                <UserBtn avatarOnly={false} username={comment.username} profile={comment?.user?.profilePicture} className={{root: "px-0", username: "font-bold text-lg"}} isOpen={false} />
                <p className="text-muted-foreground line-clamp-1">{moment(comment.createdAt).fromNow()}</p>
              </div>
              <p>{comment.body}</p>
              <div className="flex gap-2 justify-end items-center">
                <Button variant="outline" asChild className="rounded-full" size="sm">
                  <Link to={authenticated ? "#" : "/login"}>
                    <TriangleAlert />
                    <span className="hidden sm:inline">Report</span>
                  </Link>
                </Button>
                {authenticated && user?.username === comment.username && (
                  <DeleteComment token={token || ""} slug={slug} object={object} id={comment.id} />
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  );
};

export default Comment;