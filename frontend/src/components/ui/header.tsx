import Brand from "@/components/ui/brand.tsx";
import {navigations} from "@/lib/metadata.ts";
import {Navigation} from "@/lib/types.ts";
import {Link} from "react-router-dom";
import UserBtn from "@/components/ui/user-btn.tsx";
import Hamburger from "@/components/ui/hamburger.tsx";

const Header = () => {
  return (
    <header className="w-full flex justify-center items-center p-4">
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
    </header>
  );
};

export default Header;