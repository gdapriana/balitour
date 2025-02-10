import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Settings } from "lucide-react";
import { User } from "@/lib/types.ts";
import EditProfileForm from "@/pages/profile/components/edit-profile-form.tsx";

const EditProfileDialog = ({ user }: { user: User | null }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <Settings />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make change to your profile to make it more interactive</DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col justify-start items-stretch">
          <EditProfileForm user={user} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
