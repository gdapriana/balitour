import {useContext, useEffect, useState} from "react";
import {LoadingContext} from "@/provider/loading.tsx";
import Brand from "@/components/ui/brand.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight} from "lucide-react";
import FavoritedCulturesMobile from "@/pages/homepage/components/favorited-cultures-mobile.tsx";
import FavoritedCulturesDesktop from "@/pages/homepage/components/favorited-cultures-desktop.tsx";


const FavoritedCultures = () => {
  const [cultures, setCultures] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    (async function() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/cultures?count=4`)
        .then(res => res.json())
        .then(data => {
          setCultures(data.data)
          setLoading(false)
        })
    })()
  }, [setLoading])


  return (
    <div className="w-full py-20 px-4 flex justify-center items-center">
      <div className="w-full max-w-5xl gap-12 flex flex-col justify-start items-center">
        <Brand headline="Favorited Cultures" direction="col"/>
        <FavoritedCulturesMobile cultures={cultures} />
        <FavoritedCulturesDesktop cultures={cultures} />
        <Button>Load more Favorited Cultures <ArrowRight/></Button>
      </div>
    </div>
  );
};

export default FavoritedCultures;