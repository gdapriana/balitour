import {Gender, User} from "@/lib/types.ts";
import {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";

const EditProfileForm = ({ user }: { user: User}) => {

  const [picture] = useState<string | undefined>(user.profilePicture);
  const [name] = useState<string | undefined>(user.name);
  const [email] = useState<string | undefined>(user.email);
  const [phone] = useState<string | undefined>(user.phoneNumber);
  const [gender] = useState<Gender | undefined>(user.gender);

  const submitForm = (event: any) => {
    event.preventDefault();
    console.log({
      name: event.currentTarget.name.value === "" ? undefined : event.currentTarget.name.value,
      email: event.currentTarget.email.value === "" ? undefined : event.currentTarget.email.value,
      phone: event.currentTarget.phone.value === "" ? undefined : event.currentTarget.phone.value,
      picture: event.currentTarget.picture.value === "" ? undefined : event.currentTarget.picture.value,
      gender: event.currentTarget.gender.value === "" ? undefined : event.currentTarget.gender.value,
    })
  }

  return (
    <form onSubmit={submitForm} className="w-full flex flex-col my-4 justify-start items-stretch gap-2">
      <div className="flex justify-center pb-4 gap-4 items-center">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="text-muted-foreground">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          <AvatarImage src={picture} />
        </Avatar>
        <Input name="picture" className="rounded-full w-full max-w-xs" type="file" accept="image/png, image/gif, image/jpeg" />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 my-2">
        <div className="flex justify-start items-start flex-col gap-2">
          <Label htmlFor="name" className="font-bold">Name</Label>
          <Input required name="name" id="name" className="rounded-full" placeholder="Your name" defaultValue={name}/>
        </div>
        <div className="flex justify-start items-start flex-col gap-2">
          <Label htmlFor="email" className="font-bold">Email</Label>
          <Input name="email" id="email" className="rounded-full" type="email" placeholder="Your email" defaultValue={email}/>
        </div>
        <div className="flex justify-start items-start flex-col gap-2">
          <Label htmlFor="phone" className="font-bold">Phone</Label>
          <Input name="phone" id="phone" className="rounded-full" type="number" placeholder="Your phone" defaultValue={phone}/>
        </div>
        <div className="flex justify-start items-start flex-col gap-2">
          <Label htmlFor="gender" className="font-bold">Gender</Label>
          <Select name="gender" defaultValue={gender ? gender : undefined}>
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="0">Not set</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default EditProfileForm;