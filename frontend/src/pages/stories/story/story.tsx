import { useParams } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Category, Story as StoryType } from "@/lib/types.ts";
import { LoadingContext } from "@/provider/loading.tsx";
import NotFound from "@/components/ui/404.tsx";
import Hero from "@/pages/destinations/destination/components/hero.tsx";
import Body from "@/components/ui/body.tsx";
import Comment from "@/components/ui/comment.tsx";
import FavoritedItems from "@/components/ui/favorited-item.tsx";
import Categories from "@/pages/destinations/destination/components/categories.tsx";
import Header from "@/pages/stories/story/components/header.tsx";
import Action from "@/pages/stories/story/components/action.tsx";
import AdditionalImages from "@/components/ui/additional-images.tsx";
import Source from "@/components/ui/source.tsx";
import Related from "@/components/ui/related";

const Story = () => {
  const { slug } = useParams();
  const [story, setStory] = useState<StoryType>();
  const [favoritedStories, setFavoritedStories] = useState<StoryType[]>();
  const [categories, setCategories] = useState<Category[]>([]);
  const { setLoading } = useContext(LoadingContext);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getData() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/stories/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setStory(data.data);
          setLoading(false);
        });
    }
    getData().then();
  }, [slug, setLoading]);

  useEffect(() => {
    async function getData() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/stories?count=4`)
        .then((res) => res.json())
        .then((data) => {
          setFavoritedStories(data.data);
          setLoading(false);
        });
    }
    getData().then();
  }, [setLoading]);

  useEffect(() => {
    async function getData() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/categories?count=8`)
        .then((res) => res.json())
        .then((data) => {
          setCategories(data.data);
          setLoading(false);
        });
    }
    getData().then();
  }, [setLoading]);

  if (!story) {
    return <NotFound />;
  }

  return (
    <div>
      <Hero cover={story.cover} />
      <div className="w-full mt-8 flex justify-center items-center">
        <div className="w-full max-w-5xl p-4 lg:flex lg:justify-center lg:items-start gap-8">
          <div className="w-full gap-8 lg:w-2/3 flex flex-col justify-start items-stretch">
            <Header story={story} />
            <Action story={story} />
            <Body text={story.body} />
            {story?._count.images !== 0 && (
              <AdditionalImages itemName={story.name} images={story.images} />
            )}
            {story?._count.sources !== 0 && <Source sources={story.sources} />}
            <Related
              culture={story?.relatedCulture}
              district={story?.relatedDistrict}
              destination={story?.relatedDestination}
            />
            <Comment
              slug={story.slug}
              object="stories"
              itemName={story.name}
              comments={story.users_comment_stories}
            />
          </div>
          <div className="hidden flex-col gap-8 justify-start items-stretch lg:flex w-1/3">
            <FavoritedItems
              items={favoritedStories?.filter((story) => story.slug !== slug)}
              redirect={"Stories"}
            />
            <Categories categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
