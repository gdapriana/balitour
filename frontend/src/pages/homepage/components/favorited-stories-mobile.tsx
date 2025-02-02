import {Story} from "@/lib/types.ts";
import {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {cn} from "@/lib/utils.ts";
import {motion as m} from "motion/react"

const FavoritedStoriesMobile = ({stories}: {stories: Story[]}) => {
  const [activeStory, setActiveStory] = useState<number>(0);
  return (
    <div className="w-full md:hidden flex flex-col justify-start items-stretch gap-4">
      <div className="flex gap-4 items-center justify-center">
        {stories.map((story: Story, index: number) => {
          return (
            <m.div
              onClick={() => setActiveStory(index)}
              key={index}
              className={cn("border w-auto overflow-hidden flex justify-start items-center gap-1 p-[4px] rounded-full", activeStory === index && "pr-4")}
            >
              <Avatar>
                <AvatarImage src={story.User?.profilePicture} />
                <AvatarFallback>{story.username.charAt(0)}</AvatarFallback>
              </Avatar>
              {activeStory === index && (
                <m.p animate={{width: ["0%", "100%"]}} transition={{ease: "anticipate"}} className="line-clamp-1">{story.username}</m.p>
              )}
            </m.div>
          )
        })}
      </div>
    </div>
  );
};

export default FavoritedStoriesMobile;