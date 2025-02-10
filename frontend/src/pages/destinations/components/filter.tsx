import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Category, District } from "@/lib/types.ts";
import { LoadingContext } from "@/provider/loading.tsx";
import { motion as m } from "motion/react";
import { Input } from "@/components/ui/input.tsx";

const Filter = ({
  category,
  district,
}: {
  category: { value: string[]; setValue: Dispatch<SetStateAction<string[]>> };
  district: { value: string[]; setValue: Dispatch<SetStateAction<string[]>> };
}) => {
  const [categories, setCategories] = useState<Category[]>();
  const [districts, setDistricts] = useState<District[]>();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    (async function () {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/categories`)
        .then((res) => res.json())
        .then((data) => {
          setCategories(data.data);
          setLoading(false);
        });
    })();
    (async function () {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/districts`)
        .then((res) => res.json())
        .then((data) => {
          setDistricts(data.data);
          setLoading(false);
        });
    })();
  }, [setLoading]);

  const toggleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    if (category.value.includes(e.target.value)) {
      category.setValue((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      category.setValue((prev) => [...prev, e.target.value]);
    }
  };

  const toggleDistrict = (e: ChangeEvent<HTMLInputElement>) => {
    if (district.value.includes(e.target.value)) {
      district.setValue((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      district.setValue((prev) => [...prev, e.target.value]);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 justify-start items-start">
      <m.h1
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1, ease: "anticipate" }}
        className="font-bold text-xl"
      >
        FILTERS
      </m.h1>
      <m.div
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1, ease: "anticipate", delay: 0.25 }}
        className="border rounded-2xl w-full p-4 flex flex-col justify-start items-stretch gap-4"
      >
        <h1 className="font-bold">Categories</h1>
        <div className="flex flex-col justify-start items-stretch">
          {categories?.map((categoryItem: Category, index: number) => {
            return (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  checked={category.value.includes(categoryItem.slug)}
                  className="w-4"
                  value={categoryItem.slug}
                  onChange={toggleCategory}
                  type="checkbox"
                />
                <label
                  htmlFor={categoryItem.slug}
                  className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {categoryItem.name}
                </label>
              </div>
            );
          })}
        </div>
      </m.div>

      <m.div
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1, ease: "anticipate", delay: 0.5 }}
        className="border rounded-2xl w-full p-4 flex flex-col justify-start items-stretch gap-4"
      >
        <h1 className="font-bold">Districts</h1>
        <div className="flex flex-col justify-start items-stretch">
          {districts?.map((districtItem: District, index: number) => {
            return (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  className="w-4"
                  checked={district.value.includes(districtItem.slug)}
                  value={districtItem.slug}
                  onChange={toggleDistrict}
                  type="checkbox"
                />
                <label
                  htmlFor={districtItem.slug}
                  className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {districtItem.name}
                </label>
              </div>
            );
          })}
        </div>
      </m.div>
    </div>
  );
};

export default Filter;
