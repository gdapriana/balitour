import {useContext, useEffect, useState} from "react";
import {LoadingContext} from "@/provider/loading.tsx";
import Brand from "@/components/ui/brand.tsx";
import {Destination} from "@/lib/types.ts";
import DestinationCard from "@/components/ui/destination-card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight} from "lucide-react";

const FavoritedDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    (async function() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/destinations?count=4`)
        .then(res => res.json())
        .then(data => {
          setDestinations(data.data)
          setLoading(false)
        })
    })()
  }, [setLoading])

  return (
    <div className="w-full py-20 px-4 flex justify-center items-center">
      <div className="w-full max-w-5xl gap-12 flex flex-col justify-start items-center">
        <Brand headline="Favorited Destinations" direction="col" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.slice(0, 3).map((destination: Destination, index) => {
            return (
              <DestinationCard destination={destination} key={index} />
            )
          })}
        </div>
        <Button>Load more Favorited Destination <ArrowRight /></Button>
      </div>
    </div>
  );
};

export default FavoritedDestinations;