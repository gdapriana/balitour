import {useContext, useEffect, useState} from "react";
import {Category, District} from "@/lib/types.ts";
import {LoadingContext} from "@/provider/loading.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import { motion as m } from "motion/react"

const Filter = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [districts, setDistricts] = useState<District[]>();
  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    (async function() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/categories`)
        .then(res => res.json())
        .then(data => {
          setCategories(data.data)
          setLoading(false)
        })
    })();
    (async function() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/districts`)
        .then(res => res.json())
        .then(data => {
          setDistricts(data.data)
          setLoading(false)
        })
    })()
  }, [setLoading])

  return (
    <div className="flex w-full flex-col gap-4 justify-start items-start">
      <m.h1
        animate={{opacity: [0,1]}}
        transition={{duration: 1, ease: "anticipate"}}
        className="font-bold text-xl"
      >
        FILTERS
      </m.h1>
      <m.div
        animate={{opacity: [0,1]}}
        transition={{duration: 1, ease: "anticipate", delay: 0.25}}
        className="border rounded-2xl w-full p-4 flex flex-col justify-start items-stretch gap-4">
        <h1 className="font-bold">Categories</h1>
        <div className="flex flex-col justify-start items-stretch gap-4">
          {categories?.map((category: Category, index: number) => {
            return (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={category.slug}/>
                <label
                  htmlFor={category.slug}
                  className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            )
          })}
        </div>
      </m.div>

      <m.div
        animate={{opacity: [0,1]}}
        transition={{duration: 1, ease: "anticipate", delay: 0.5}}
        className="border rounded-2xl w-full p-4 flex flex-col justify-start items-stretch gap-4">
        <h1 className="font-bold">Districts</h1>
        <div className="flex flex-col justify-start items-stretch gap-4">
          {districts?.map((district: District, index: number) => {
            return (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={district.slug}/>
                <label
                  htmlFor={district.slug}
                  className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {district.name}
                </label>
              </div>
            )
          })}
        </div>
      </m.div>
    </div>
  );
};

export default Filter;