import {Route, Routes} from "react-router-dom";
import Homepage from "@/pages/homepage/homepage.tsx";
import Destinations from "@/pages/destinations/destinations.tsx";
import Cultures from "@/pages/cultures/cultures.tsx";
import Stories from "@/pages/stories/stories.tsx";
import Destination from "@/pages/destinations/destination/destination.tsx";
import Culture from "@/pages/cultures/culture/culture.tsx";
import Story from "@/pages/stories/story/story.tsx";
import {useContext, useEffect, useState} from "react";
import Loading from "@/components/ui/loading.tsx";
import Header from "@/components/ui/header.tsx";
import {LoadingContext} from "@/provider/loading.tsx";

function App() {
  const { loading, setLoading } = useContext(LoadingContext)
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    (async function() {
      setLoading(true);
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/destinations?count=2`)
        .then(res => res.json())
        .then(data => {
          setDestinations(data.data)
          setLoading(false);
        })
    })()
  }, [setLoading])

  console.log(destinations)

  if (loading) return <Loading />
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:slug" element={<Destination />} />
        <Route path="/cultures" element={<Cultures />} />
        <Route path="/cultures/:slug" element={<Culture />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:slug" element={<Story />} />
      </Routes>
    </div>
  )
}

export default App
