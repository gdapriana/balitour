import {useParams} from "react-router-dom";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import {Category, Culture as CultureType} from "@/lib/types.ts";
import {LoadingContext} from "@/provider/loading.tsx";
import NotFound from "@/components/ui/404.tsx";
import Hero from "@/pages/destinations/destination/components/hero.tsx";
import Categories from "@/pages/destinations/destination/components/categories.tsx";
import FavoritedItems from "@/components/ui/favorited-item.tsx";
import Header from "@/pages/cultures/culture/components/header.tsx";
import Action from "@/pages/cultures/culture/components/action.tsx";
import Comment from "@/components/ui/comment.tsx";
import Body from "@/components/ui/body.tsx";

const Culture = () => {
  const { slug } = useParams()
  const [culture, setCulture] = useState<CultureType>()
  const [favoritedCultures, setFavoritedCultures] = useState<CultureType[]>()
  const [categories, setCategories] = useState<Category[]>([])
  const { setLoading } = useContext(LoadingContext)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    async function getData() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/cultures/${slug}`)
        .then(res => res.json())
        .then(data => {
          setCulture(data.data)
          setLoading(false)
        })
    }
    getData().then()
  }, [slug, setLoading])

  useEffect(() => {
    async function getData() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/cultures?count=4`)
        .then(res => res.json())
        .then(data => {
          setFavoritedCultures(data.data)
          setLoading(false)
        })
    }
    getData().then()
  }, [setLoading])

  useEffect(() => {
    async function getData() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/categories?count=8`)
        .then(res => res.json())
        .then(data => {
          setCategories(data.data)
          setLoading(false)
        })
    }
    getData().then()
  }, [setLoading])

  if (!culture) {
    return <NotFound />
  }

  return (
    <div>
      <Hero cover={culture.cover}/>
      <div className="w-full mt-8 flex justify-center items-center">
        <div className="w-full max-w-5xl p-4 lg:flex lg:justify-center lg:items-start gap-8">
          <div className="w-full gap-8 lg:w-2/3 flex flex-col justify-start items-stretch">
            <Header culture={culture} />
            <Action culture={culture} />
            <Body text={culture.body} />
            <Comment slug={culture.slug} object="cultures" itemName={culture.name} comments={culture.users_comment_cultures} />
          </div>
          <div className="hidden flex-col gap-8 justify-start items-stretch lg:flex w-1/3">
            <FavoritedItems
              items={favoritedCultures?.filter(culture => culture.slug !== slug)}
              redirect={"Cultures"}
            />
            <Categories categories={categories}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Culture;