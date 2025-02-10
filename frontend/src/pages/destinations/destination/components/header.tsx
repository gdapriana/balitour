import { Destination } from "@/lib/types.ts";
import { Button } from "@/components/ui/button.tsx";
import { Layers2, Map, Wallet } from "lucide-react";
import { motion as m } from "framer-motion";

const Header = ({ destination }: { destination: Destination | undefined }) => {
  return (
    <m.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1, delay: 0.5 }}
      className="flex flex-col justify-start"
    >
      <h1 className="font-bold md:text-xl lg:text-2xl">{destination?.name}</h1>
      <h3 className="text-muted-foreground">{destination?.address}</h3>
      <div className="flex flex-wrap justify-start my-4 items-center gap-2">
        <Button variant="outline" className="rounded-full">
          <Map />
          {destination?.District?.name}
        </Button>
        <Button variant="outline" className="rounded-full">
          <Layers2 />
          {destination?.Category?.name}
        </Button>
        <Button variant="outline" className="rounded-full">
          <Wallet />
          {destination?.price}
        </Button>
      </div>
      <p className="">{destination?.description}</p>
    </m.div>
  );
};

export default Header;
