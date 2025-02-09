import {Gender, User} from "@/lib/types.ts";
import {useContext, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LoadingContext} from "@/provider/loading.tsx";
import {AuthContext} from "@/provider/auth.tsx";
import {useNavigate} from "react-router-dom";

const EditProfileForm = ({ user }: { user: User | null}) => {

  const { setLoading } = useContext(LoadingContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState<File>();
  const [name, setName] = useState<string | undefined>(user?.name);
  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(user?.phoneNumber);
  const [gender, setGender] = useState<Gender | undefined | string | null>(user?.gender);

  const submitForm = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    if (gender === "0") setGender(null)
    try {
      let imageUrl = null;
      if (profilePicture) {
        const formData = new FormData();
        formData.append('photo', profilePicture);
        const uploadResponse = await fetch(`${import.meta.env.VITE_PUBLIC_API}/users/profile-image`, {
          method: 'POST',
          headers: {
            Authorization: token!
          },
          body: formData,
        })
        if (uploadResponse.ok) {
          const data = await uploadResponse.json();
          imageUrl = data.result.secure_url;
        }
      }

      const updateResponse = await fetch(`${import.meta.env.VITE_PUBLIC_API}/users/${user?.username}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: token!
        },
        body: JSON.stringify({
          name,
          email: email !== "" ? email : null,
          phoneNumber: phoneNumber !== "" ? phoneNumber : null,
          gender: gender === "0" ? null : gender,
          profilePicture: imageUrl !== null ? imageUrl : undefined,
        })
      })

      if (updateResponse.ok) {
        navigate(0)
      }

    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submitForm} className="w-full flex flex-col my-4 justify-start items-stretch gap-2">
      <div className="flex justify-center pb-4 gap-4 items-center">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="text-muted-foreground">{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
          <AvatarImage className="bg-cover object-cover" src={user?.profilePicture} />
        </Avatar>
        <Input
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setProfilePicture(e.target.files[0]);
            }
          }}
          name="picture"
          className="rounded-full w-full max-w-xs"
          type="file"
          accept="image/png, image/gif, image/jpeg"
        />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 my-2">
        <div className="flex justify-start items-start flex-col gap-2">
          <Label htmlFor="name" className="font-bold">Name</Label>
          <Input onChange={(e) => setName(e.target.value)} required name="name" id="name" className="rounded-full" placeholder="Your name" defaultValue={name}/>
        </div>
        <div className="flex justify-start items-start flex-col gap-2">
          <Label htmlFor="email" className="font-bold">Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="rounded-full" type="email" placeholder="Your email" defaultValue={email}/>
        </div>
        <div className="flex justify-start items-start flex-col gap-2">
          <Label htmlFor="phone" className="font-bold">Phone</Label>
          <Input onChange={(e) => setPhoneNumber(e.target.value)} name="phone" id="phone" className="rounded-full" type="number" placeholder="Your phone" defaultValue={phoneNumber}/>
        </div>
        <div className="flex justify-start items-start flex-col gap-2">
          <Label htmlFor="gender" className="font-bold">Gender</Label>
          <Select onValueChange={(e) => setGender(e as Gender)} name="gender" defaultValue={gender ? gender : undefined}>
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