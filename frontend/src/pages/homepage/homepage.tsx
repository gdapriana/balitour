import Hero from "@/pages/homepage/components/hero.tsx";
import FavoritedDestinations from "@/pages/homepage/components/favorited-destinations.tsx";
import FavoritedCultures from "@/pages/homepage/components/favorited-cultures.tsx";
const Homepage = () => {
  return (
    <div>
      <Hero />
      <FavoritedDestinations />
      <FavoritedCultures />
    </div>
  );
};

export default Homepage;