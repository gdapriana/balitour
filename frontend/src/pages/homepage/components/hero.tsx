import Brand from "@/components/ui/brand.tsx";
import Search from "@/pages/homepage/components/search.tsx";
import { motion as m } from "motion/react";

const Hero = () => {
  return (
    <main className="w-full flex justify-center items-center border-b">
      <div className="w-full flex-col gap-4 max-w-5xl p-4 h-[602px] lg:h-[633px] xl:h-[682px] flex justify-center items-center">
        <Brand
          className={{headline: "text-lg lg:text-xl xl:text-2xl", root: "gap-1"}}
          headline={import.meta.env.VITE_PUBLIC_APP}
          direction="col" />
        <m.p
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 1, ease: "anticipate" }}
          className="w-full max-w-md lg:text-lg xl:text-xl text-muted-foreground text-center"
        >
          Your Ultimate Guide to Bali’s Best Destinations, Traditions, and Stories
        </m.p>
        <Search />
      </div>
    </main>
  );
};

export default Hero;