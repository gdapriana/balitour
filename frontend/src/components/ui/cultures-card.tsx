import {Link} from "react-router-dom";
import {Culture} from "@/lib/types.ts";

const CultureCard = ({culture}: { culture: Culture }) => {
  return (
    <Link className="rounded-[1.3rem] border flex flex-col group overflow-hidden" to={`/cultures/${culture.slug}`}>
      <img src={culture.cover || ""} className="aspect-video object-cover transition duration-300 grayscale group-hover:grayscale-0"  alt="cover"/>
      <div className="p-4 flex flex-col gap-1 justify-start items-start">
        <h1 className="font-bold line-clamp-1 text-stone-800">{culture.name}</h1>
        <p className="line-clamp-2 text-sm text-muted-foreground">{culture.description}</p>
      </div>
    </Link>
  );
};

export default CultureCard;