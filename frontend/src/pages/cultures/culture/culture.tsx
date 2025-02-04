import {useParams} from "react-router-dom";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import {Category, Culture as CultureType} from "@/lib/types.ts";
import {LoadingContext} from "@/provider/loading.tsx";
import NotFound from "@/components/ui/404.tsx";

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
      {slug}
    </div>
  );
};

export default Culture;