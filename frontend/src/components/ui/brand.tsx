import {cn} from "@/lib/utils.ts";
import {Link} from "react-router-dom";

const Brand = (
  {headline, direction, className}: {
    headline: string,
    direction: "col" | "row"
    className?: {
      root?: string,
      icon?: string,
      headline?: string
    }
  }
) => {
  return (
    <main className={cn("flex gap-4 justify-center items-center", direction === "col" ? "flex-col" : "flex-row", className?.root)}>
      <Link to="/">
        <img className={cn("w-20", className?.icon)} alt="logo" src="/logo.svg"/>
      </Link>
      <h1 className={cn("font-bold text-lg text-stone-800", className?.headline)}>{headline}</h1>
    </main>
  )
}

export default Brand;