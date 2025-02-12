import { Culture, Destination, Story } from "@/lib/types.ts";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";

const FavoritedItems = ({
  items,
  redirect,
}: {
  items: Destination[] | Culture[] | Story[] | undefined;
  redirect: string;
}) => {
  return (
    <div className="flex flex-col gap-4 justify-start items-stretch">
      <h1 className="font-bold text-lg">Favorited {redirect}</h1>
      <div className="flex flex-col gap-2 justify-start items-stretch">
        {items?.map((item, index: number) => {
          return (
            <m.div animate={{ opacity: [0, 1] }} transition={{ duration: 1, delay: 0.6 * index }} key={index}>
              <Link
                className="border rounded-2xl overflow-hidden group grid grid-cols-[1fr_auto] justify-center items-stretch"
                to={`/${redirect}/${item.slug}`}
              >
                <div className="p-4 flex-col flex-1 flex justify-center items-start">
                  <h3 className="line-clamp-1 font-bold">{item.name}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
                <img
                  alt="cover"
                  className="w-20 h-full object-cover group-hover:grayscale-0 grayscale duration-1000 transition"
                  src={item?.cover || ""}
                />
              </Link>
            </m.div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritedItems;
