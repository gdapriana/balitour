import Brand from "@/components/ui/brand.tsx";
import {navigations} from "@/lib/metadata.ts";
import {Navigation} from "@/lib/types.ts";
import {Link} from "react-router-dom";
import UserBtn from "@/components/ui/user-btn.tsx";
import Hamburger from "@/components/ui/hamburger.tsx";
import {useContext} from "react";
import {ScrollContext} from "@/provider/scroll.tsx";
import {cn} from "@/lib/utils.ts";
import { motion as m} from "motion/react"

const Header = () => {
  const { scrolled } = useContext(ScrollContext);
  return (
    <m.header
      animate={scrolled ? { borderBottom: "1px solid #d6d6d6" }: {borderBottom: "0"}}
      transition={{duration: 0.5}}
      className={cn("w-full sticky top-0 z-[999] bg-white flex justify-center items-center p-4")}
    >
      <div className="w-full flex justify-between items-center max-w-5xl">
        <Brand
          headline={import.meta.env.VITE_PUBLIC_APP}
          direction="row"
          className={{
            icon: "w-10",
            headline: "hidden text-xl lg:inline"
          }}
        />
        
        <div className="hidden md:flex gap-4">
          {navigations.map((navigation: Navigation, index: number) => {
            return (
              <Link to={navigation.path} key={index} className="text-muted-foreground hover:text-primary">
                {navigation.title}
              </Link>
            )
          })}
        </div>
        <Hamburger className="md:hidden" />
        <UserBtn
          className={{
            root: "border hidden md:flex"
          }}
          username="apriana"
          profile="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          avatarOnly={false} />
      </div>
    </m.header>
  );
};

export default Header;