import { Destination } from "@/lib/types.ts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Bookmark, Heart, Wallet } from "lucide-react";

const DestinationCard = ({ destination }: { destination: Destination }) => {
  return (
    <Link
      className="rounded-[1.3rem] border flex flex-col group overflow-hidden"
      to={`/destinations/${destination.slug}`}
    >
      <img
        src={destination.cover || ""}
        className="aspect-video object-cover transition duration-300 grayscale group-hover:grayscale-0"
      />
      <div className="p-4 flex flex-col gap-1 justify-start items-stretch">
        <h1 className="font-bold line-clamp-1 text-stone-800">{destination.name}</h1>
        <p className="line-clamp-2 text-sm text-muted-foreground">{destination.description}</p>
        <div className="flex gap-2 overflow-auto justify-start items-center mt-4">
          <Button variant="outline" size="sm" className="rounded-lg">
            <Bookmark />
            {destination._count.users_save_destinations}
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg">
            <Heart />
            {destination._count.users_like_destinations}
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg">
            <Wallet />
            {destination.price}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
