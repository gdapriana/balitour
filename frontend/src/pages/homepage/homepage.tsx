import Hero from "@/pages/homepage/components/hero.tsx";
import FavoritedDestinations from "@/pages/homepage/components/favorited-destinations.tsx";
import FavoritedCultures from "@/pages/homepage/components/favorited-cultures.tsx";
import FavoritedStories from "@/pages/homepage/components/favorited-stories.tsx";
import { useLayoutEffect } from "react";
const Homepage = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <FavoritedDestinations />
      <FavoritedCultures />
      <FavoritedStories />
    </div>
  );
};

export default Homepage;
