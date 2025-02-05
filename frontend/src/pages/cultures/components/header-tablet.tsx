import Brand from "@/components/ui/brand.tsx";
import Search from "@/pages/cultures/components/search.tsx";
import SortSelect from "@/pages/cultures/components/sort-select.tsx";
import FilterDialog from "@/pages/cultures/components/filter-dialog.tsx";
import {Dispatch, SetStateAction} from "react";

const HeaderTablet = ({ setName, district, sortBy }: {
  setName: Dispatch<SetStateAction<string>>;
  district: {value: string[]; setValue: Dispatch<SetStateAction<string[]>>};
  sortBy: {value: string; setValue: Dispatch<SetStateAction<string>>};
}) => {
  return (
    <div className="w-full lg:hidden px-4 py-20 max-w-5xl flex flex-col justify-center items-center gap-4">
      <Brand className={{icon: "w-20"}} headline="ALL CULTURES" direction="col" />
      <Search setName={setName} />
      <div className="flex justify-center items-center gap-2">
        <FilterDialog district={district} />
        <SortSelect sortBy={sortBy} />
      </div>
    </div>
  );
};

export default HeaderTablet;