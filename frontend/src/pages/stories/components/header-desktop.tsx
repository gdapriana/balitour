import Brand from "@/components/ui/brand.tsx";
import Search from "@/pages/stories/components/search.tsx";
import SortSelect from "@/pages/stories/components/sort-select.tsx";
import {Dispatch, SetStateAction} from "react";

const HeaderDesktop = ({setName}: {setName: Dispatch<SetStateAction<string>>}) => {
  return (
    <div className="w-full hidden lg:flex justify-between items-center">
      <Brand headline="ALL STORIES" className={{icon: "w-8"}} direction="row" />
      <Search setName={setName} />
      <SortSelect />
    </div>
  );
};

export default HeaderDesktop;