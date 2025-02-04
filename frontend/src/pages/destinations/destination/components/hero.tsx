import {useContext} from "react";
import {ScrollContext} from "@/provider/scroll.tsx";
import {motion as m} from "motion/react";

const Hero = ({ cover }: {cover: string}) => {
  const {value} = useContext(ScrollContext)
  return (
    <div className="w-full overflow-hidden relative h-[339px] lg:h-[440px]">
      <m.img animate={{ y: .5 * value }} transition={{ease: "backOut"}} src={cover} alt="cover" className="absolute grayscale h-full top-0 left-0 w-full object-cover" />
    </div>
  );
};

export default Hero;