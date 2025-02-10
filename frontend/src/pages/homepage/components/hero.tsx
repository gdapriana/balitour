import Brand from "@/components/ui/brand.tsx";
import Search from "@/pages/homepage/components/search.tsx";
import { motion as m } from "motion/react";
import { useContext } from "react";
import { ScrollContext } from "@/provider/scroll.tsx";

const Hero = () => {
  const { value } = useContext(ScrollContext);
  return (
    <main
      style={{ backgroundImage: `url(/gradient.png)`, backgroundSize: "cover", backgroundPosition: "center" }}
      className="w-full flex justify-center overflow-hidden items-center border-b"
    >
      <m.div
        animate={{ y: 0.5 * value }}
        transition={{ ease: "circOut" }}
        className="w-full flex-col gap-4 max-w-5xl p-4 h-[602px] flex justify-center items-center"
      >
        <Brand
          className={{ headline: "text-lg lg:text-xl xl:text-2xl", root: "gap-1" }}
          headline={import.meta.env.VITE_PUBLIC_APP}
          direction="col"
        />
        <m.p
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 1, ease: "anticipate" }}
          className="w-full max-w-md lg:text-lg xl:text-xl text-muted-foreground text-center"
        >
          Your Ultimate Guide to Bali’s Best Destinations, Traditions, and Stories
        </m.p>
        <Search />
      </m.div>
    </main>
  );
};

export default Hero;
