import { Story } from "@/lib/types.ts";
import { motion as m } from "framer-motion";
import { cn } from "@/lib/utils.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { ArrowRightIcon, Calendar } from "lucide-react";
import moment from "moment";

const FavoritedStoriesDesktop = ({ stories }: { stories: Story[] }) => {
  const [activeStory, setActiveStory] = useState<number>(0);
  return (
    <div className="hidden md:flex flex-col overflow-hidden gap-4 rounded-[1.3rem] w-full">
      <div className="flex w-full gap-4 items-center justify-center">
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
      <div className="w-full flex gap-4">
        {stories.map((story: Story, index: number) => {
          return (
            <m.div
              key={index}
              animate={activeStory === index ? { width: "43%" } : { width: "19%" }}
              transition={{ duration: 1, ease: "anticipate" }}
              onMouseEnter={() => setActiveStory(index)}
              className={cn("border h-[350px] relative transition duration-1000 overflow-hidden rounded-[1.3rem]")}
            >
              <m.img
                animate={activeStory !== index ? { filter: "grayscale(100%)" } : { filter: "grayscale(0)" }}
                src={story.cover}
                className={cn("h-full object-cover")}
                transition={{ duration: 2, ease: "anticipate" }}
                alt="cover"
              />
              <m.div
                animate={activeStory === index ? { bottom: 0 } : { bottom: "-100%" }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-0 flex flex-col justify-start items-stretch left-0 w-full p-4 bg-primary-foreground"
              >
                <h1 className="font-bold text-lg">{story.name}</h1>
                <p className="flex text-muted-foreground gap-1 mb-2 justify-start items-center">
                  <Calendar className="w-4 h-4" />
                  {moment(story.createdAt).fromNow()}
                </p>
                <p className="text-muted-foreground line-clamp-3 text-sm">{story.description}</p>
                <Button size="sm" className="ms-auto mt-4" asChild>
                  <Link to={`/stories/${story.slug}`}>
                    View <ArrowRightIcon />
                  </Link>
                </Button>
              </m.div>
            </m.div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritedStoriesDesktop;
