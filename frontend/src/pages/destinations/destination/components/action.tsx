import {Destination} from "@/lib/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Bookmark, Heart, MessageCircle} from "lucide-react";

const Action = ({ destination }: {destination: Destination | undefined}) => {
  return (
    <div className="py-8 flex-wrap border-y gap-2 flex justify-end items-center">
      <Button className="rounded-full"><Bookmark />{destination?._count.users_save_destinations} <span className="hidden md:inline">Users saved</span></Button>
      <Button className="rounded-full"><Heart/>{destination?._count.users_like_destinations} <span className="hidden md:inline">Users liked</span></Button>
      <Button className="rounded-full"><MessageCircle/>{destination?._count.users_comment_destinations} <span className="hidden md:inline">Users commented</span></Button>
    </div>
  );
};

export default Action;