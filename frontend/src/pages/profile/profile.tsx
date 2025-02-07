import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "@/provider/auth.tsx";
import Header from "@/pages/profile/components/header.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Bookmark, Heart} from "lucide-react";
import {Culture, Destination, Story} from "@/lib/types.ts";
import StoryCard from "@/components/ui/story-card.tsx";
import DestinationCard from "@/components/ui/destination-card.tsx";
import CultureCard from "@/components/ui/cultures-card.tsx";

const Profile = () => {
  const { authenticated, user } = useContext(AuthContext);
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<"st" | "fd" | "fc" | "fs" | "ld" | "lc" | "ls" >("st");

  if (!authenticated) {
    return navigate("/login");
  }

  console.log({user})
  return (
    <div>
      <Header user={user!} />
      <div className="w-full mt-10 gap-2 flex justify-center items-center">
        <div className="flex border-y py-4 gap-1 overflow-auto justify-start lg:justify-center items-center w-full max-w-5xl">
          <Button className="rounded-full" onClick={() => setActiveSection("st")} variant={activeSection === "st" ? "outline" : "ghost"}>Your Story</Button>
          <Button className="rounded-full" onClick={() => setActiveSection("fd")} variant={activeSection === "fd" ? "outline" : "ghost"}><Bookmark /> Destination</Button>
          <Button className="rounded-full" onClick={() => setActiveSection("fc")} variant={activeSection === "fc" ? "outline" : "ghost"} ><Bookmark /> Cultures</Button>
          <Button className="rounded-full" onClick={() => setActiveSection("fs")} variant={activeSection === "fs" ? "outline" : "ghost"} ><Bookmark /> Stories</Button>
          <Button className="rounded-full" onClick={() => setActiveSection("ld")} variant={activeSection === "ld" ? "outline" : "ghost"}><Heart /> Destination</Button>
          <Button className="rounded-full" onClick={() => setActiveSection("lc")} variant={activeSection === "lc" ? "outline" : "ghost"} ><Heart /> Cultures</Button>
          <Button className="rounded-full" onClick={() => setActiveSection("ls")} variant={activeSection === "ls" ? "outline" : "ghost"} ><Heart /> Stories</Button>
        </div>
      </div>
      <div className="w-full flex my-4 justify-center items-center">
        <div className="grid relative w-full gap-2 max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {activeSection === "st" && (
            user?.stories?.map((story: Story, index: number) => {
              return (
                <StoryCard story={story} key={index}/>
              )
            })
          )}
          {activeSection === "fd" && (
            user?.users_save_destinations?.map((destination: {destination: Destination}, index: number) => {
              return (
                <DestinationCard destination={destination.destination} key={index}/>
              )
            })
          )}
          {activeSection === "fc" && (
            user?.users_save_cultures?.map((culture: {culture: Culture}, index: number) => {
              return (
                <CultureCard culture={culture.culture} key={index}/>
              )
            })
          )}
          {activeSection === "fs" && (
            user?.users_save_stories?.map((story: {story: Story}, index: number) => {
              return (
                <StoryCard story={story.story} key={index}/>
              )
            })
          )}
          {activeSection === "ld" && (
            user?.users_like_destinations?.map((destination: {destination: Destination}, index: number) => {
              return (
                <DestinationCard destination={destination.destination} key={index}/>
              )
            })
          )}
          {activeSection === "lc" && (
            user?.users_like_cultures?.map((culture: {culture: Culture}, index: number) => {
              return (
                <CultureCard culture={culture.culture} key={index}/>
              )
            })
          )}
          {activeSection === "ls" && (
            user?.users_like_stories?.map((story: {story: Story}, index: number) => {
              return (
                <StoryCard story={story.story} key={index}/>
              )
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;