import {Culture} from "@/lib/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Map} from "lucide-react";
import { motion as m } from "framer-motion";

const Header = ({ culture }: { culture: Culture | undefined}) => {
  return (
    <m.div
      animate={{opacity: [0, 1]}} transition={{duration: 1, delay: .5}}
      className="flex flex-col justify-start">
      <h1 className="font-bold md:text-xl lg:text-2xl">{culture?.name}</h1>
      {culture?.address && (
        <h3 className="text-muted-foreground">{culture?.address}</h3>
      )}
      <div className="flex flex-wrap justify-start my-4 items-center gap-2">
        {culture?.District ? (
          <Button variant="outline" className="rounded-full">
            <Map />
            {culture?.District?.name}
          </Button>
        ): (
          <Button variant="outline" className="rounded-full">
            <Map />
            National
          </Button>
        )}
      </div>
      <p className="">{culture?.description}</p>
    </m.div>
  );
};

export default Header;