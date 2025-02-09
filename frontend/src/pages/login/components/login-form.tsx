import {Dispatch, SetStateAction} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

const LoginForm = ({setPassword, setUsername}: {
  setPassword: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="w-full flex flex-col gap-4 justify-start items-stretch">
      <div className="flex justify-start items-start flex-col gap-2">
        <Label htmlFor="username" className="font-bold">Username</Label>
        <Input onChange={(e) => setUsername(e.target.value)} required name="Your username" id="username"
               className="rounded-full" placeholder="Your name"/>
      </div>
      <div className="flex justify-start items-start flex-col gap-2">
        <Label htmlFor="password" className="font-bold">Password</Label>
        <Input onChange={(e) => setPassword(e.target.value)} required name="Your password" id="password"
               className="rounded-full" placeholder="Your password" type="password"/>
      </div>
    </div>
  );
};

export default LoginForm;