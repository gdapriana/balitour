import { useParams } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Category, Destination as DestinationTypes } from "@/lib/types.ts";
import { LoadingContext } from "@/provider/loading.tsx";
import Hero from "@/pages/destinations/destination/components/hero.tsx";
import Header from "@/pages/destinations/destination/components/header.tsx";
import NotFound from "@/components/ui/404.tsx";
import Action from "@/pages/destinations/destination/components/action.tsx";
import Map from "@/pages/destinations/destination/components/map.tsx";
import Categories from "@/pages/destinations/destination/components/categories.tsx";
import FavoritedItems from "@/components/ui/favorited-item.tsx";
import Comment from "@/components/ui/comment.tsx";
import AdditionalImages from "@/components/ui/additional-images.tsx";
import Source from "@/components/ui/source.tsx";
import RelatedItem from "@/components/ui/related-item.tsx";

const Destination = () => {
  const { slug } = useParams();
  const [destination, setDestination] = useState<DestinationTypes>();
  const [favoritedDestinations, setFavoritedDestinations] = useState<DestinationTypes[]>();
  const [categories, setCategories] = useState<Category[]>([]);
  const { setLoading } = useContext(LoadingContext);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async function () {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/destinations/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setDestination(data.data);
          setLoading(false);
        });
    })();
  }, [slug, setLoading]);
  useEffect(() => {
    (async function () {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/destinations?count=4`)
        .then((res) => res.json())
        .then((data) => {
          setFavoritedDestinations(data.data);
          setLoading(false);
        });
    })();
  }, [setLoading]);
  useEffect(() => {
    (async function () {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/categories?count=8`)
        .then((res) => res.json())
        .then((data) => {
          setCategories(data.data);
          setLoading(false);
        });
    })();
  }, [setLoading]);

  if (!destination) return <NotFound />;
  return (
    <div>
      <Hero cover={destination?.cover || ""} />
      <div className="w-full mt-8 flex justify-center items-center">
        <div className="w-full max-w-5xl p-4 lg:flex lg:justify-center lg:items-start gap-8">
          <div className="w-full gap-8 lg:w-2/3 flex flex-col justify-start items-stretch">
            <Header destination={destination} />
            <Action destination={destination} />
            <Map coordinates={destination.map} />
            {destination?._count.images !== 0 && (
              <AdditionalImages itemName={destination.name} images={destination.images} />
            )}
            {destination?._count.sources !== 0 && <Source sources={destination.sources} />}
            <Comment
              slug={destination.slug}
              object="destinations"
              itemName={destination.name}
              comments={destination.users_comment_destinations}
            />
          </div>
          <div className="hidden flex-col gap-8 justify-start items-stretch lg:flex w-1/3">
            <FavoritedItems
              items={favoritedDestinations?.filter((destination) => destination.slug !== slug)}
              redirect="Destinations"
            />
            {destination.relatedStories?.length !== 0 && (
              <RelatedItem itemsName="stories" items={destination.relatedStories} />
            )}
            <Categories categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
