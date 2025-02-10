import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/provider/loading.tsx";
import Brand from "@/components/ui/brand.tsx";
import FavoritedStoriesMobile from "@/pages/homepage/components/favorited-stories-mobile.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FavoritedStoriesDesktop from "@/pages/homepage/components/favorited-stories-desktop.tsx";

const FavoritedStories = () => {
  const [stories, setStories] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    (async function () {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/stories?count=4`)
        .then((res) => res.json())
        .then((data) => {
          setStories(data.data);
          setLoading(false);
        });
    })();
  }, [setLoading]);

  return (
    <div className="w-full py-10 px-4 flex justify-center items-center">
      <div className="w-full max-w-5xl gap-6 flex flex-col justify-start items-center">
        <Brand headline="Beautiful Story from" direction="col" />
        <FavoritedStoriesMobile stories={stories} />
        <FavoritedStoriesDesktop stories={stories} />
        <Button asChild>
          <Link to={`/stories`}>
            Load more Stories <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FavoritedStories;
