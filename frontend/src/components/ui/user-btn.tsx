import {cn} from "@/lib/utils.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Link} from "react-router-dom";
import {Plus, User2} from "lucide-react";
import {useContext, useState} from "react";
import {AuthContext} from "@/provider/auth.tsx";
import LogoutAlert from "@/components/ui/logout-alert.tsx";

const UserBtn = (
  {profile, username, avatarOnly, className, isOpen=true}: {
    profile?: string;
    username?: string;
    avatarOnly: boolean;
    className?: {
      root?: string;
      avatar?: string;
      username?: string;
    };
    isOpen?: boolean;
  }
) => {
  const [open, setOpen] = useState(false);
  const { authenticated } = useContext(AuthContext);
  return (
    <DropdownMenu open={isOpen ? open : false} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <main
          className={cn("flex p-1 cursor-pointer justify-center items-center rounded-full", className?.root, username && "pr-3 gap-2")}>
          <Avatar className={cn("w-8 h-8", className?.avatar)}>
            <AvatarImage className={cn("w-8 h-8", className?.avatar)} src={profile}/>
            <AvatarFallback
              className={cn("h-8 w-8", className?.avatar)}>{username ? username.charAt(0) : "?"}</AvatarFallback>
          </Avatar>
          {!avatarOnly && (
            <h3 className={cn("", className?.username)}>{username}</h3>
          )}
        </main>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[99999] shadow-none">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/profile">
            <Plus />
            Post Story
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/profile">
            <User2 />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          {authenticated && (
            <LogoutAlert />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBtn;