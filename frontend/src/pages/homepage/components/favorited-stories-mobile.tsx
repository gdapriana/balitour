import { Story } from "@/lib/types.ts";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { cn } from "@/lib/utils.ts";
import { motion as m } from "motion/react";
import StoryCard from "@/components/ui/story-card.tsx";

const FavoritedStoriesMobile = ({ stories }: { stories: Story[] }) => {
  const [activeStory, setActiveStory] = useState<number>(0);
  return (
    <div className="w-full md:hidden flex flex-col justify-start items-stretch gap-4">
      <div className="flex gap-4 items-center justify-center">
        {stories.map((story: Story, index: number) => {
          return (
            <m.div
              onClick={() => setActiveStory(index)}
              key={index}
              className={cn(
                "border w-auto overflow-hidden flex justify-start items-center gap-1 p-[4px] rounded-full",
                activeStory === index ? "pr-4" : "pr-[4px]",
              )}
            >
              <Avatar>
                <AvatarImage src={story.User?.profilePicture} />
                <AvatarFallback>{story.username.charAt(0)}</AvatarFallback>
              </Avatar>
              {activeStory === index && (
                <m.p
                  animate={{ width: ["0%", "100%"], opacity: [0, 1] }}
                  transition={{ ease: "anticipate", duration: 0.8 }}
                  className="line-clamp-1"
                >
                  {story.username}
                </m.p>
              )}
            </m.div>
          );
        })}
      </div>
      <m.div className="w-full justify-center items-center">
        <StoryCard story={stories[activeStory]} />
      </m.div>
    </div>
  );
};

export default FavoritedStoriesMobile;
