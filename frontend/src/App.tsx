import {Route, Routes} from "react-router-dom";
import Homepage from "@/pages/homepage/homepage.tsx";
import Destinations from "@/pages/destinations/destinations.tsx";
import Cultures from "@/pages/cultures/cultures.tsx";
import Stories from "@/pages/stories/stories.tsx";
import Destination from "@/pages/destinations/destination/destination.tsx";
import Culture from "@/pages/cultures/culture/culture.tsx";
import Story from "@/pages/stories/story/story.tsx";
import {useContext, useRef} from "react";
import Loading from "@/components/ui/loading.tsx";
import Header from "@/components/ui/header.tsx";
import {LoadingContext} from "@/provider/loading.tsx";
import { useScroll, useMotionValueEvent } from "motion/react"
import {ScrollContext} from "@/provider/scroll.tsx";
import Footer from "@/components/ui/footer.tsx";
import Login from "@/pages/login/login.tsx";
import Register from "@/pages/register/register.tsx";
import Profile from "@/pages/profile/profile.tsx";

function App() {
  const { loading } = useContext(LoadingContext)
  const { setScrolled, setValue } = useContext(ScrollContext)
  const containerRef = useRef(null);
  const { scrollY } = useScroll({container: document.body as any, offset: ["start end", "end end"]});

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10)
    setValue(latest)
  })


  if (loading) return <Loading />
  return (
    <div ref={containerRef} className="relative">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:slug" element={<Destination />} />
        <Route path="/cultures" element={<Cultures />} />
        <Route path="/cultures/:slug" element={<Culture />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:slug" element={<Story />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
