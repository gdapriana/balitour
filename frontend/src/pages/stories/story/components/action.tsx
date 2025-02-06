import {Story} from "@/lib/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Bookmark, MessageCircle} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/provider/auth.tsx";
import UnsaveAlert from "@/components/ui/unsave-alert.tsx";
import SaveAlert from "@/components/ui/save-alert.tsx";
import UnlikeAlert from "@/components/ui/unlike-alert.tsx";
import LikeAlert from "@/components/ui/like-alert.tsx";
import {Link} from "react-router-dom";

const Action = ({ story }: {story: Story | undefined}) => {

  const {authenticated, token} = useContext(AuthContext)
  const [saved, setSaved] = useState<boolean>(false)
  const [liked, setLiked] = useState<boolean>(false)

  useEffect(() => {
    (async function() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/stories/${story?.slug}/saved`, {
        headers: {Authorization: token! }
      })
        .then(res => res.json())
        .then(data => {
          setSaved(data.data)
        })
    })()
  }, [story?.slug, token]);
  useEffect(() => {
    (async function() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/stories/${story?.slug}/liked`, {
        headers: {Authorization: token! }
      })
        .then(res => res.json())
        .then(data => {
          setLiked(data.data)
        })
    })()
  }, [story?.slug, token]);

  return (
    <div className="py-8 flex-wrap border-y gap-2 flex justify-end items-center">
      {authenticated ? (
        <>
          {saved ? (
            <UnsaveAlert object="stories" slug={story?.slug} itemName={story?.name} token={token!} savedCount={story?._count.users_save_stories} />
          ): (
            <SaveAlert object="stories" slug={story?.slug} itemName={story?.name} token={token!} savedCount={story?._count.users_save_stories} />
          )}
          {liked ? (
            <UnlikeAlert object="stories" slug={story?.slug} itemName={story?.name} token={token!} likedCount={story?._count.users_like_stories} />
          ): (
            <LikeAlert object="stories" slug={story?.slug} itemName={story?.name} token={token!} likedCount={story?._count.users_like_stories} />
          )}
          <Button className="rounded-full"><MessageCircle/>{story?._count.users_comment_stories} <span className="hidden md:inline">Users commented</span></Button>
        </>
      ): (
        <>
          <Button asChild className="rounded-full">
            <Link to="/login">
              <Bookmark />{story?._count.users_save_stories} <span className="hidden md:inline">Users saved</span>
            </Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link to="/login">
              <MessageCircle/>{story?._count.users_comment_stories} <span className="hidden md:inline">Users commented</span>
            </Link>
          </Button>
          <Button className="rounded-full"><MessageCircle/>{story?._count.users_comment_stories} <span className="hidden md:inline">Users commented</span></Button>
        </>
      )}
    </div>
  );
};

export default Action;