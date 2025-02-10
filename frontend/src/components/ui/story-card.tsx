import { Story } from "@/lib/types.ts";
import { Link } from "react-router-dom";
import moment from "moment";
import { Calendar } from "lucide-react";
import UserBtn from "@/components/ui/user-btn.tsx";

const StoryCard = ({ story }: { story: Story }) => {
  return (
    <Link className="rounded-[1.3rem] border flex flex-col group overflow-hidden" to={`/stories/${story?.slug}`}>
      <img
        src={story?.cover || ""}
        className="aspect-video object-cover transition duration-300 grayscale group-hover:grayscale-0"
        alt="cover"
      />
      <div className="p-4 flex flex-col gap-1 justify-start items-stretch">
        <h1 className="font-bold line-clamp-1 text-stone-800">{story?.name}</h1>
        <p className="text-muted-foreground flex justify-start line-clamp-1 items-center gap-1 mb-2">
          <Calendar className="w-3 h-3" /> uploaded {moment(story?.createdAt).fromNow()}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">{story?.description}</p>
        <div className="flex justify-end items-center mt-4 overflow-auto">
          <div className="hidden md:flex">
            <UserBtn avatarOnly={false} className={{ root: "border" }} username={story?.username} />
          </div>
          <div className="md:hidden flex">
            <UserBtn avatarOnly={true} className={{ root: "border" }} username={story?.username} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;
