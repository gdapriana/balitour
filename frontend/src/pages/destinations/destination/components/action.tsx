import {Destination} from "@/lib/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Bookmark, MessageCircle} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/provider/auth.tsx";
import {Link} from "react-router-dom";
import SaveAlert from "@/components/ui/save-alert.tsx";
import LikeAlert from "@/components/ui/like-alert.tsx";
import UnlikeAlert from "@/components/ui/unlike-alert.tsx";
import UnsaveAlert from "@/components/ui/unsave-alert.tsx";

const Action = ({ destination }: {destination: Destination | undefined}) => {
  const {authenticated, token} = useContext(AuthContext)
  const [saved, setSaved] = useState<boolean>(false)
  const [liked, setLiked] = useState<boolean>(false)

  useEffect(() => {
    (async function() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/destinations/${destination?.slug}/saved`, {
        headers: {Authorization: token! }
      })
        .then(res => res.json())
        .then(data => {
          setSaved(data.data)
        })
    })()
  }, [destination?.slug, token]);
  useEffect(() => {
    (async function() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/destinations/${destination?.slug}/liked`, {
        headers: {Authorization: token! }
      })
        .then(res => res.json())
        .then(data => {
          setLiked(data.data)
        })
    })()
  }, [destination?.slug, token]);

  return (
    <div className="py-8 flex-wrap border-y gap-2 flex justify-end items-center">
      {authenticated ? (
        <>
          {saved ? (
            <UnsaveAlert object="destinations" slug={destination?.slug} itemName={destination?.name} token={token!} savedCount={destination?._count.users_save_destinations} />
          ): (
            <SaveAlert object="destinations" slug={destination?.slug} itemName={destination?.name} token={token!} savedCount={destination?._count.users_save_destinations} />
          )}
          {liked ? (
            <UnlikeAlert object="destinations" slug={destination?.slug} itemName={destination?.name} token={token!} likedCount={destination?._count.users_like_destinations} />
          ): (
            <LikeAlert object="destinations" slug={destination?.slug} itemName={destination?.name} token={token!} likedCount={destination?._count.users_like_destinations} />
          )}
          <Button asChild className="rounded-full">
            <a href="#comment">
              <MessageCircle/>{destination?._count.users_comment_destinations} <span className="hidden md:inline">Users commented</span>
            </a>
          </Button>
        </>
      ): (
        <>
          <Button asChild className="rounded-full">
            <Link to="/login">
              <Bookmark />{destination?._count.users_save_destinations} <span className="hidden md:inline">Users saved</span>
            </Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link to="/login">
              <MessageCircle/>{destination?._count.users_comment_destinations} <span className="hidden md:inline">Users commented</span>
            </Link>
          </Button>
          <Button className="rounded-full"><MessageCircle/>{destination?._count.users_comment_destinations} <span className="hidden md:inline">Users commented</span></Button>
        </>
      )}
    </div>
  );
};

export default Action;