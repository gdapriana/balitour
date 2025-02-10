import Brand from "@/components/ui/brand.tsx";
import Search from "@/pages/cultures/components/search.tsx";
import SortSelect from "@/pages/cultures/components/sort-select.tsx";
import { Dispatch, SetStateAction } from "react";

const HeaderDesktop = ({
  setName,
  sortBy,
}: {
  setName: Dispatch<SetStateAction<string>>;
  sortBy: { value: string; setValue: Dispatch<SetStateAction<string>> };
}) => {
  return (
    <div className="w-full hidden lg:flex justify-between items-center">
      <Brand headline="ALL CULTURES" className={{ icon: "w-8" }} direction="row" />
      <div className="flex justify-center items-center gap-4">
        <Search setName={setName} />
        <SortSelect sortBy={sortBy} />
      </div>
    </div>
  );
};

export default HeaderDesktop;
