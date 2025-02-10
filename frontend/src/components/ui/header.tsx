import Brand from "@/components/ui/brand.tsx";
import { navigations } from "@/lib/metadata.ts";
import { Navigation } from "@/lib/types.ts";
import { Link, NavLink, useLocation } from "react-router-dom";
import UserBtn from "@/components/ui/user-btn.tsx";
import Hamburger from "@/components/ui/hamburger.tsx";
import { useContext } from "react";
import { ScrollContext } from "@/provider/scroll.tsx";
import { cn } from "@/lib/utils.ts";
import { motion as m } from "motion/react";
import { AuthContext } from "@/provider/auth.tsx";
import { Button } from "@/components/ui/button.tsx";
import { LogInIcon } from "lucide-react";

const Header = () => {
  const { scrolled } = useContext(ScrollContext);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { authenticated, user } = useContext(AuthContext);

  return (
    <m.header
      animate={scrolled ? { borderBottom: "1px solid #d6d6d6" } : { borderBottom: "0" }}
      transition={{ duration: 0.5 }}
      className={cn("w-full sticky top-0 z-[999] bg-white flex justify-center items-center p-4")}
    >
      <div className="w-full flex justify-between items-center max-w-5xl">
        <Brand
          headline={import.meta.env.VITE_PUBLIC_APP}
          direction="row"
          className={{
            icon: "w-10",
            headline: "hidden text-xl lg:inline",
          }}
        />

        <div className="hidden md:flex gap-4">
          {navigations.map((navigation: Navigation, index: number) => {
            return (
              <div key={index} className="relative">
                <m.div
                  animate={path === navigation.path.split("/")[1] ? { width: "50%" } : { width: "0%" }}
                  className="absolute z-0 bottom-[-5px] left-1/2 translate-x-[-50%] h-[3px] bg-stone-800 rounded-full"
                ></m.div>
                <NavLink
                  to={navigation.path}
                  className={cn(
                    "z-10 hover:text-primary transition",
                    path === navigation.path.split("/")[1] ? "font-bold" : "font-normal text-muted-foreground",
                  )}
                >
                  {navigation.title}
                </NavLink>
              </div>
            );
          })}
        </div>
        <Hamburger className="md:hidden" />
        {authenticated ? (
          <UserBtn
            className={{
              root: "border hidden md:flex",
            }}
            profile={user?.profilePicture}
            username={user?.username}
            avatarOnly={false}
          />
        ) : (
          <Button className="rounded-full hidden md:flex" asChild>
            <Link to="/login">
              Login <LogInIcon />
            </Link>
          </Button>
        )}
      </div>
    </m.header>
  );
};

export default Header;
