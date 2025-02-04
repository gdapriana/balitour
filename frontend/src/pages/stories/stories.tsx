import {useContext, useEffect, useLayoutEffect, useState} from "react";
import {LoadingContext} from "@/provider/loading.tsx";
import {Story} from "@/lib/types.ts";
import { motion as m } from "motion/react"
import HeaderTablet from "@/pages/stories/components/header-tablet.tsx";
import HeaderDesktop from "@/pages/stories/components/header-desktop.tsx";
import StoryCard from "@/components/ui/story-card.tsx";

const Stories = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);


  const { setLoading } = useContext(LoadingContext)
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>()

  useEffect(() => {
    (async function() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/stories`)
        .then(res => res.json())
        .then(data => {
          setAllStories(data.data)
          setLoading(false)
        })
    })();
  }, [setLoading])

  useEffect(() => {
    setFilteredStories(allStories)
  }, [allStories]);

  return (
    <div>
      <div className="flex p-4 justify-center w-full items-center">
        <div className="w-full my-10 max-w-5xl gap-12 flex justify-center items-start">
          <m.div
            animate={{opacity: [0, 1]}}
            transition={{duration: 1, ease: "anticipate"}}
            className="w-full flex flex-col justify-start items-stretch gap-8">
            <HeaderTablet/>
            <HeaderDesktop/>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStories?.map((story: Story, index: number) => {
                return (
                  <m.div
                    initial='hidden'
                    whileInView="visible"
                    viewport={{once: false}}
                    transition={{duration: 1, delay: 0.2 * index}}
                    variants={{
                      visible: {opacity: 1},
                      hidden: {opacity: 0},
                    }}
                    key={index}>
                    <StoryCard story={story} />
                  </m.div>
                )
              })}
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default Stories;