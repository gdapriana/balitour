import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "@/provider/auth.tsx";
import Header from "@/pages/profile/components/header.tsx";
import {Button} from "@/components/ui/button.tsx";

const Profile = () => {
  const { authenticated, user } = useContext(AuthContext);
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<"st" | "fd" | "fc" | "fs" | "ld" | "lc" | "ls" >("st");

  if (!authenticated) {
    return navigate("/login");
  }

  return (
    <div>
      <Header user={user!} />
      <div className="w-full mt-10 gap-2 flex justify-center items-center">
        <div className="flex flex-wrap justify-center items-center w-full max-w-5xl">
          <Button className="rounded-full" onClick={() => setActiveSection("st")} variant={activeSection === "st" ? "outline" : "ghost"}>Your Story</Button>
          <Button className="rounded-full" onClick={() => setActiveSection("fd")} variant={activeSection === "fd" ? "outline" : "ghost"}>Favorited Destination</Button>
          <Button className="rounded-full" onClick={() => setActiveSection("fc")} variant={activeSection === "fc" ? "outline" : "ghost"} >Favorited Cultures</Button>
          <Button className="rounded-full" onClick={() => setActiveSection("fs")} variant={activeSection === "fs" ? "outline" : "ghost"} >Favorited Stories</Button>
          <Button className="rounded-full" onClick={() => setActiveSection("ld")} variant={activeSection === "ld" ? "outline" : "ghost"}>Liked Destination</Button>
          <Button className="rounded-full" onClick={() => setActiveSection("lc")} variant={activeSection === "lc" ? "outline" : "ghost"} >Liked Cultures</Button>
          <Button className="rounded-full" onClick={() => setActiveSection("ls")} variant={activeSection === "ls" ? "outline" : "ghost"} >Liked Stories</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;