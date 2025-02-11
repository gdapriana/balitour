import { Culture, Destination, District } from "@/lib/types";
import { LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Related = ({
  culture,
  destination,
  district,
}: {
  culture: Culture | undefined;
  destination: Destination | undefined;
  district: District | undefined;
}) => {
  return (
    <div className="w-full flex flex-col gap-4 justify-start items-stretch">
      <header>
        <h1 className="font-bold flex justify-start gap-1 items-center lg:text-2xl text-xl">
          <LinkIcon />
          Related
        </h1>
      </header>
      <div className="flex justify-start items-center gap-1 overflow-auto">
        {culture && (
          <Button variant="outline" asChild>
            <Link to={`/cultures/${culture.slug}`}>
              <span className="font-bold">{culture?.name}</span>
            </Link>
          </Button>
        )}
        {destination && (
          <Button variant="outline" asChild>
            <Link to={`/destinations/${destination.slug}`}>
              <span className="font-bold">{destination?.name}</span>
            </Link>
          </Button>
        )}
        {district && (
          <Button variant="outline" asChild>
            <Link to={`/destinations?dis=${district.slug}`}>
              <span className="font-bold">{district?.name}</span>
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Related;
