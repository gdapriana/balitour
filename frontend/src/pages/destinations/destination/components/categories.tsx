import {Category} from "@/lib/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

const Categories = ({categories}: {categories: Category[] | undefined}) => {
  return (
    <div className="flex flex-col gap-4 justify-start items-stretch">
      <h1 className="font-bold text-lg">Popular Categories</h1>
      <div className="flex flex-wrap gap-2">
        {categories?.map((category, index: number) => {
          return (
            <Button size="sm" variant="outline" className="rounded-full" asChild key={index}>
              <Link to="#">{category.name}</Link>
            </Button>
          )
        })}
      </div>
    </div>
  );
};

export default Categories;
