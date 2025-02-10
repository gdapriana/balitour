import { Story } from "@/lib/types.ts";
import { motion as m } from "framer-motion";
import UserBtn from "@/components/ui/user-btn.tsx";
import moment from "moment";

const Header = ({ story }: { story: Story | undefined }) => {
  return (
    <m.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1, delay: 0.5 }}
      className="flex flex-col justify-start"
    >
      <h1 className="font-bold md:text-xl lg:text-2xl">{story?.name}</h1>
      <p className="text-muted-foreground">Uploaded {moment(story?.createdAt).fromNow()}</p>
      <div className="flex justify-start my-4 items-center gap-2">
        <UserBtn isOpen={false} profile={story?.User?.profilePicture} className={{ root: "border" }} avatarOnly={false} username={story?.User?.username} />
      </div>
      <p className="">{story?.description}</p>
    </m.div>
  );
};

export default Header;
