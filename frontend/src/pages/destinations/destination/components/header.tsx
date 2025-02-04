import {Destination} from "@/lib/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Map, Wallet} from "lucide-react";

const Header = ({ destination }: { destination: Destination | undefined}) => {
  return (
    <div className="flex flex-col justify-start">
      <h1 className="font-bold md:text-xl lg:text-2xl">{destination?.name}</h1>
      <h3 className="text-muted-foreground">{ destination?.address }</h3>
      <div className="flex flex-wrap justify-start my-4 items-center gap-2">
        <Button variant="outline" className="rounded-full">
          <Map />
          {destination?.District?.name}
        </Button>
        <Button variant="outline" className="rounded-full">
          <Map />
          {destination?.Category?.name}
        </Button>
        <Button variant="outline" className="rounded-full">
          <Wallet />
          {destination?.price}
        </Button>
      </div>
      <p className="">{destination?.description}</p>
    </div>
  );
};

export default Header;