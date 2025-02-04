import {Culture} from "@/lib/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Bookmark, Heart, MessageCircle} from "lucide-react";

const Action = ({ culture }: {culture: Culture | undefined}) => {
  return (
    <div className="py-8 flex-wrap border-y gap-2 flex justify-end items-center">
      <Button className="rounded-full"><Bookmark />{culture?._count.users_save_cultures} <span className="hidden md:inline">Users saved</span></Button>
      <Button className="rounded-full"><Heart/>{culture?._count.users_like_cultures} <span className="hidden md:inline">Users liked</span></Button>
      <Button className="rounded-full"><MessageCircle/>{culture?._count.users_comment_cultures} <span className="hidden md:inline">Users commented</span></Button>
    </div>
  );
};

export default Action;