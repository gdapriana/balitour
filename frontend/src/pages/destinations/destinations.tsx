import HeaderTablet from "@/pages/destinations/components/header-tablet.tsx";
import HeaderDesktop from "@/pages/destinations/components/header-desktop.tsx";
import Filter from "@/pages/destinations/components/filter.tsx";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { motion as m } from "motion/react";
import { Destination } from "@/lib/types.ts";
import { LoadingContext } from "@/provider/loading.tsx";
import DestinationCard from "@/components/ui/destination-card.tsx";
import NotFound from "@/components/ui/not-found.tsx";
import { useNavigate, useLocation } from "react-router-dom";

const Destinations = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { setLoading } = useContext(LoadingContext);
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>();
  const navigate = useNavigate();
  const location = useLocation();

  // filter
  const [name, setName] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("favorited");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialCategories = searchParams.getAll("cat");
    const initialDistricts = searchParams.getAll("dis");
    setCategories(initialCategories);
    setDistricts(initialDistricts);
  }, [location.search]);
  useEffect(() => {
    const searchParams = new URLSearchParams();
    categories.forEach((cat) => searchParams.append("cat", cat));
    districts.forEach((dis) => searchParams.append("dis", dis));
    navigate({ search: searchParams.toString() });
  }, [categories, districts, navigate]);
  useEffect(() => {
    (async function () {
      const queryParams = new URLSearchParams();
      if (name !== "") queryParams.append("name", name);
      categories.forEach((cat) => queryParams.append("category", cat));
      districts.forEach((dis) => queryParams.append("district", dis));
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/destinations?${queryParams.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          setAllDestinations(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching destinations:", error);
          setLoading(false);
        });
    })();
  }, [setLoading, name, categories, districts]);
  useEffect(() => {
    const sortedDestinations = [...allDestinations].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "commented":
          return b._count.users_comment_destinations - a._count.users_comment_destinations;
        case "favorited":
          return b._count.users_save_destinations - a._count.users_save_destinations;
        case "liked":
          return b._count.users_like_destinations - a._count.users_like_destinations;
        case "price":
          return (b.price || 0) - (a.price || 0);
        default:
          return 0;
      }
    });
    setFilteredDestinations(sortedDestinations);
  }, [allDestinations, sortBy]);
  return (
    <div>
      <div className="flex p-4 justify-center w-full items-center">
        <div className="w-full my-10 max-w-5xl gap-12 flex justify-center items-start">
          <div className="hidden lg:flex w-1/4 flex-col justify-start items-stretch">
            <Filter
              category={{ value: categories, setValue: setCategories }}
              district={{ value: districts, setValue: setDistricts }}
            />
          </div>
          <m.div
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1, ease: "anticipate" }}
            className="w-3/4 flex flex-col justify-start items-stretch gap-8"
          >
            <HeaderTablet
              district={{ value: districts, setValue: setDistricts }}
              category={{ value: categories, setValue: setCategories }}
              sortBy={{ value: sortBy, setValue: setSortBy }}
              setName={setName}
            />
            <HeaderDesktop sortBy={{ value: sortBy, setValue: setSortBy }} setName={setName} />
            {filteredDestinations?.length === 0 && <NotFound title="Destination" />}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {filteredDestinations?.map((destination: Destination, index: number) => {
                return (
                  <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.2 * index }}
                    variants={{
                      visible: { opacity: 1 },
                      hidden: { opacity: 0 },
                    }}
                    key={index}
                  >
                    <DestinationCard destination={destination} />
                  </m.div>
                );
              })}
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
