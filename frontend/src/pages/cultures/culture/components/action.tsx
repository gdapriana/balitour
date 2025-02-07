import {Culture} from "@/lib/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Bookmark, MessageCircle} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/provider/auth.tsx";
import UnsaveAlert from "@/components/ui/unsave-alert.tsx";
import SaveAlert from "@/components/ui/save-alert.tsx";
import UnlikeAlert from "@/components/ui/unlike-alert.tsx";
import LikeAlert from "@/components/ui/like-alert.tsx";
import {Link} from "react-router-dom";

const Action = ({ culture }: {culture: Culture | undefined}) => {
  const {authenticated, token} = useContext(AuthContext)
  const [saved, setSaved] = useState<boolean>(false)
  const [liked, setLiked] = useState<boolean>(false)

  useEffect(() => {
    (async function() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/cultures/${culture?.slug}/saved`, {
        headers: {Authorization: token! }
      })
        .then(res => res.json())
        .then(data => {
          setSaved(data.data)
        })
    })()
  }, [culture?.slug, token]);
  useEffect(() => {
    (async function() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/cultures/${culture?.slug}/liked`, {
        headers: {Authorization: token! }
      })
        .then(res => res.json())
        .then(data => {
          setLiked(data.data)
        })
    })()
  }, [culture?.slug, token]);
  return (
    <div className="py-8 flex-wrap border-y gap-2 flex justify-end items-center">
      {authenticated ? (
        <>
          {saved ? (
            <UnsaveAlert object="cultures" slug={culture?.slug} itemName={culture?.name} token={token!} savedCount={culture?._count.users_save_cultures} />
          ): (
            <SaveAlert object="cultures" slug={culture?.slug} itemName={culture?.name} token={token!} savedCount={culture?._count.users_save_cultures} />
          )}
          {liked ? (
            <UnlikeAlert object="cultures" slug={culture?.slug} itemName={culture?.name} token={token!} likedCount={culture?._count.users_like_cultures} />
          ): (
            <LikeAlert object="cultures" slug={culture?.slug} itemName={culture?.name} token={token!} likedCount={culture?._count.users_like_cultures} />
          )}
          <Button asChild className="rounded-full">
            <a href="#comment">
              <MessageCircle/>{culture?._count.users_comment_cultures} <span className="hidden md:inline">Users commented</span>
            </a>
          </Button>
        </>
      ): (
        <>
          <Button asChild className="rounded-full">
            <Link to="/login">
              <Bookmark />{culture?._count.users_save_cultures} <span className="hidden md:inline">Users saved</span>
            </Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link to="/login">
              <MessageCircle/>{culture?._count.users_comment_cultures} <span className="hidden md:inline">Users commented</span>
            </Link>
          </Button>
          <Button className="rounded-full"><MessageCircle/>{culture?._count.users_comment_cultures} <span className="hidden md:inline">Users commented</span></Button>
        </>
      )}
    </div>
  );
};

export default Action;