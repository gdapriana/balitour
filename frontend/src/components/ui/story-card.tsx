import { Story } from "@/lib/types.ts";
import { Link } from "react-router-dom";
import moment from "moment";
import { Calendar, Edit2, Trash } from "lucide-react";
import UserBtn from "@/components/ui/user-btn.tsx";
import { useContext } from "react";
import { AuthContext } from "@/provider/auth.tsx";
import { Button } from "@/components/ui/button.tsx";
import DeleteItemAlert from "@/components/ui/delete-item-alert.tsx";

const StoryCard = ({ story }: { story: Story | undefined }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="relative">
      {user?.username === story?.username && story && (
        <div className="flex absolute top-0 right-0 m-4 z-[10] gap-2">
          <Button variant="outline" size="icon">
            <Edit2 />
          </Button>
          <DeleteItemAlert title={story?.name} object="stories" slug={story?.slug}>
            <Button variant="outline" size="icon">
              <Trash />
            </Button>
          </DeleteItemAlert>
        </div>
      )}
      <Link className="rounded-[1.3rem] border flex flex-col group overflow-hidden" to={`/stories/${story?.slug}`}>
        <img
          src={story?.cover || import.meta.env.VITE_PUBLIC_COVER}
          className="aspect-video object-cover transition duration-300 grayscale group-hover:grayscale-0"
          alt="cover"
        />
        <div className="p-4 flex flex-col gap-1 justify-start items-stretch">
          <h1 className="font-bold line-clamp-1 text-stone-800">{story?.name}</h1>
          <p className="text-muted-foreground flex justify-start line-clamp-1 items-center gap-1 mb-2">
            <Calendar className="w-3 h-3" /> uploaded {moment(story?.createdAt).fromNow()}
          </p>
          <p className="line-clamp-2 text-sm text-muted-foreground">{story?.description}</p>
          <div className="flex gap-2 justify-end items-center mt-4 overflow-auto">
            <div className="hidden md:flex">
              <UserBtn
                avatarOnly={true}
                isOpen={false}
                profile={story?.user?.profilePicture}
                className={{ root: "border" }}
              />
            </div>
            <div className="md:hidden gap-2 flex">
              <UserBtn
                isOpen={false}
                avatarOnly={false}
                profile={story?.user?.profilePicture}
                className={{ root: "border" }}
                username={story?.username}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StoryCard;
