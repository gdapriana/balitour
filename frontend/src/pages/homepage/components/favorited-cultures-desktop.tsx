import { Culture } from "@/lib/types.ts";
import { useState } from "react";
import { cn } from "@/lib/utils.ts";
import { motion as m } from "motion/react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

const FavoritedCulturesDesktop = ({ cultures }: { cultures: Culture[] }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  return (
    <div className="hidden md:flex overflow-hidden gap-4 rounded-[1.3rem] w-full">
      {cultures.map((culture: Culture, index: number) => {
        return (
          <m.div
            animate={activeSlide === index ? { width: "43%" } : { width: "19%" }}
            transition={{ duration: 1, ease: "anticipate" }}
            onMouseEnter={() => setActiveSlide(index)}
            key={index}
            className={cn("border h-[350px] relative transition duration-1000 overflow-hidden rounded-[1.3rem]")}
          >
            <m.img
              animate={activeSlide !== index ? { filter: "grayscale(100%)" } : { filter: "grayscale(0)" }}
              src={culture.cover}
              className={cn("h-full object-cover")}
              transition={{ duration: 2, ease: "anticipate" }}
              alt="cover"
            />
            <m.div
              animate={activeSlide === index ? { bottom: 0 } : { bottom: "-100%" }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-0 flex flex-col justify-start items-stretch left-0 w-full p-4 bg-primary-foreground"
            >
              <h1 className="font-bold text-lg">{culture.name}</h1>
              <p className="text-muted-foreground line-clamp-3 text-sm">{culture.description}</p>
              <Button size="sm" className="ms-auto mt-4" asChild>
                <Link to={`/cultures/${culture.slug}`}>
                  View <ArrowRightIcon />
                </Link>
              </Button>
            </m.div>
          </m.div>
        );
      })}
    </div>
  );
};

export default FavoritedCulturesDesktop;
