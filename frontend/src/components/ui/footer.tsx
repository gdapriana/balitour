import Brand from "@/components/ui/brand.tsx";
import {motion as m} from "framer-motion";
import {navigations} from "@/lib/metadata.ts";
import {Navigation} from "@/lib/types.ts";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t flex mt-20 flex-col justify-center items-center">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-8 py-20 lg:flex-row">
          <div className="w-full gap-4 flex-col lg:w-auto lg:flex-1 flex justify-center lg:items-start items-center">
            <Brand headline={import.meta.env.VITE_PUBLIC_APP} direction="col"/>
            <m.p
              animate={{opacity: [0, 1]}}
              transition={{duration: 1, ease: "anticipate"}}
              className="w-full max-w-md lg:text-lg xl:text-xl text-muted-foreground text-center lg:text-start"
            >
              Your Ultimate Guide to Bali’s Best Destinations, Traditions, and Stories
            </m.p>
          </div>
          <div className="w-full lg:w-auto flex justify-center lg:items-start gap-8 items-center">
            <div className="flex justify-start flex-col items-start">
              {navigations.map((navigation: Navigation, index: number) => {
                return (
                  <Link key={index} className="text-muted-foreground" to={navigation.path}>{navigation.title}</Link>
                )
              })}
            </div>
            <div className="flex justify-start flex-col items-start">
              <Link className="text-muted-foreground" to="#">Term of services</Link>
              <Link className="text-muted-foreground" to="#">Privacy & Policy</Link>
              <Link className="text-muted-foreground" to="#">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-20 bg-stone-950"></div>
    </footer>
  );
};

export default Footer;