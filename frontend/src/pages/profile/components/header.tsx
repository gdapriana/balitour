import {User} from "@/lib/types.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import EditProfileDialog from "@/pages/profile/components/edit-profile-dialog.tsx";

const Header = ({user}: {user: User | null}) => {
  return (
    <header className="w-full mt-8 flex p-4 justify-center items-center">
      <div className="w-full max-w-5xl flex justify-center items-center">
        <div className="flex flex-col justify-start items-center">
          <Avatar className="md:w-16 md:h-16">
            <AvatarFallback className="text-muted-foreground">{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
            <AvatarImage src={user?.profilePicture} />
          </Avatar>
          <h1 className="font-bold md:text-lg mt-2">{user?.name}</h1>
          <p className="text-muted-foreground">@{user?.username} | {user?.gender === "MALE" ? "male" : user?.gender === "FEMALE" ? "female" : "gender notset"} | {user?.phoneNumber ? user.phoneNumber : "phone notset"}</p>
          <div className="flex mt-4 justify-center items-center gap-2">
            <Button className="rounded-full">
              <Plus/>
              Post Story
            </Button>
            <EditProfileDialog user={user} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;