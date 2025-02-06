import {Destination} from "@/lib/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Bookmark, Heart, MessageCircle} from "lucide-react";
import {useContext} from "react";
import {AuthContext} from "@/provider/auth.tsx";
import {Link} from "react-router-dom";

const Action = ({ destination }: {destination: Destination | undefined}) => {
  const {authenticated} = useContext(AuthContext)

  return (
    <div className="py-8 flex-wrap border-y gap-2 flex justify-end items-center">
      {authenticated ? (
        <>
          <Button className="rounded-full"><Bookmark />{destination?._count.users_save_destinations} <span className="hidden md:inline">Users saved</span></Button>
          <Button className="rounded-full"><Heart/>{destination?._count.users_like_destinations} <span className="hidden md:inline">Users liked</span></Button>
          <Button className="rounded-full"><MessageCircle/>{destination?._count.users_comment_destinations} <span className="hidden md:inline">Users commented</span></Button>
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