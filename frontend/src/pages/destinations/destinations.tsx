import HeaderTablet from "@/pages/destinations/components/header-tablet.tsx";
import HeaderDesktop from "@/pages/destinations/components/header-desktop.tsx";
import Filter from "@/pages/destinations/components/filter.tsx";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import { motion as m } from "motion/react"
import {Destination} from "@/lib/types.ts";
import {LoadingContext} from "@/provider/loading.tsx";
import DestinationCard from "@/components/ui/destination-card.tsx";
import NotFound from "@/components/ui/not-found.tsx";

const Destinations = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const { setLoading } = useContext(LoadingContext)
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>()

  const [name, setName] = useState<string>("");

  useEffect(() => {
    (async function() {
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/destinations?${name !== "" && `name=${name}`}`)
        .then(res => res.json())
        .then(data => {
          setAllDestinations(data.data)
          setLoading(false)
        })
    })();
  }, [setLoading, name])

  useEffect(() => {
    setFilteredDestinations(allDestinations)
  }, [allDestinations]);

  return (
    <div>
      <div className="flex p-4 justify-center w-full items-center">
        <div className="w-full my-10 max-w-5xl gap-12 flex justify-center items-start">
          <div className="hidden lg:flex w-1/4 flex-col justify-start items-stretch">
            <Filter />
          </div>
          <m.div
            animate={{opacity: [0,1]}}
            transition={{duration: 1, ease: "anticipate"}}
            className="w-3/4 flex flex-col justify-start items-stretch gap-8">
            <HeaderTablet setName={setName} />
            <HeaderDesktop setName={setName} />
            {filteredDestinations?.length === 0 && (
              <NotFound title="Destination" />
            )}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {filteredDestinations?.map((destination: Destination, index: number) => {
                return (
                  <m.div
                    initial='hidden'
                    whileInView="visible"
                    viewport={{once: false}}
                    transition={{duration: 1, delay: 0.2 * index}}
                    variants={{
                      visible: {opacity: 1},
                      hidden: {opacity: 0},
                    }}
                    key={index}>
                    <DestinationCard destination={destination} />
                  </m.div>
                )
              })}
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;