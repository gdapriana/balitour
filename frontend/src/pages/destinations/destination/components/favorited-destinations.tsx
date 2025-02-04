import {Destination} from "@/lib/types.ts";
import {Link} from "react-router-dom";

const FavoritedDestinations = ({destinations}: {destinations: Destination[] | undefined}) => {
  return (
    <div className="flex flex-col gap-4 justify-start items-stretch">
      <h1 className="font-bold text-lg">Favorited Destinations</h1>
      <div className="flex flex-col gap-2 justify-start items-stretch">
        {destinations?.map((destination, index: number) => {
          return (
            <Link className="border rounded-2xl overflow-hidden group grid grid-cols-[1fr_auto] justify-center items-stretch" to={`/destinations/${destination.slug}`} key={index}>
              <div className="p-4 flex flex-col flex-1 flex justify-center items-start">
                <h3 className="line-clamp-1 font-bold">{ destination.name}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{destination.description}</p>
              </div>
              <img className="w-20 h-full object-cover group-hover:grayscale-0 grayscale duration-1000 transition"
                     src={destination?.cover || ""}/>
            </Link>
          )
        })}
      </div>

    </div>
  );
};

export default FavoritedDestinations;