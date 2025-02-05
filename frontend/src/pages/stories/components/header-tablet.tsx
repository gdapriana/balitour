import Brand from "@/components/ui/brand.tsx";
import Search from "@/pages/stories/components/search.tsx";
import SortSelect from "@/pages/stories/components/sort-select.tsx";
import {Dispatch, SetStateAction} from "react";

const HeaderTablet = ({setName, sortBy}: {
  setName: Dispatch<SetStateAction<string>>;
  sortBy: {value: string; setValue: Dispatch<SetStateAction<string>>};
}) => {
  return (
    <div className="w-full lg:hidden px-4 py-20 max-w-5xl flex flex-col justify-center items-center gap-4">
      <Brand className={{icon: "w-20"}} headline="ALL STORIES" direction="col" />
      <Search setName={setName} />
      <div className="flex justify-center items-center gap-2">
        <SortSelect sortBy={sortBy} />
      </div>
    </div>
  );
};

export default HeaderTablet;