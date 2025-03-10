import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { LoadingContext } from "@/provider/loading.tsx";
import { Culture } from "@/lib/types.ts";
import { motion as m } from "motion/react";
import Filter from "@/pages/cultures/components/filter.tsx";
import HeaderTablet from "@/pages/cultures/components/header-tablet.tsx";
import HeaderDesktop from "@/pages/cultures/components/header-desktop.tsx";
import CultureCard from "@/components/ui/cultures-card.tsx";
import NotFound from "@/components/ui/not-found.tsx";
import { useLocation, useNavigate } from "react-router-dom";

const Cultures = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { setLoading } = useContext(LoadingContext);
  const [allCultures, setAllCultures] = useState<Culture[]>([]);
  const [filteredCultures, setFilteredCultures] = useState<Culture[]>();
  const navigate = useNavigate();
  const location = useLocation();

  // filter
  const [name, setName] = useState<string>("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("favorited");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialDistricts = searchParams.getAll("dis");
    setDistricts(initialDistricts);
  }, [location.search]);
  useEffect(() => {
    const searchParams = new URLSearchParams();
    districts.forEach((dis) => searchParams.append("dis", dis));
    navigate({ search: searchParams.toString() });
  }, [districts, navigate]);
  useEffect(() => {
    (async function () {
      const queryParams = new URLSearchParams();
      if (name !== "") queryParams.append("name", name);
      districts.forEach((dis) => queryParams.append("district", dis));
      await fetch(`${import.meta.env.VITE_PUBLIC_API}/cultures?${queryParams.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          setAllCultures(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching destinations:", error);
          setLoading(false);
        });
    })();
  }, [setLoading, name, districts]);
  useEffect(() => {
    const sortedDestinations = [...allCultures].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "commented":
          return b._count.users_comment_cultures - a._count.users_comment_cultures;
        case "favorited":
          return b._count.users_save_cultures - a._count.users_save_cultures;
        case "liked":
          return b._count.users_like_cultures - a._count.users_like_cultures;
        default:
          return 0;
      }
    });
    setFilteredCultures(sortedDestinations);
  }, [allCultures, sortBy]);

  return (
    <div>
      <div className="flex p-4 justify-center w-full items-center">
        <div className="w-full my-10 max-w-5xl gap-12 flex justify-center items-start">
          <div className="hidden lg:flex w-1/4 flex-col justify-start items-stretch">
            <Filter district={{ value: districts, setValue: setDistricts }} />
          </div>
          <m.div
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1, ease: "anticipate" }}
            className="w-3/4 flex flex-col justify-start items-stretch gap-8"
          >
            <HeaderTablet
              district={{ value: districts, setValue: setDistricts }}
              sortBy={{ value: sortBy, setValue: setSortBy }}
              setName={setName}
            />
            <HeaderDesktop sortBy={{ value: sortBy, setValue: setSortBy }} setName={setName} />
            {filteredCultures?.length === 0 && <NotFound title="Cultures" />}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {filteredCultures?.map((culture: Culture, index: number) => {
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
                    <CultureCard culture={culture} />
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

export default Cultures;
