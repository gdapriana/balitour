import Brand from "@/components/ui/brand.tsx";
import Search from "@/pages/stories/components/search.tsx";
import SortSelect from "@/pages/stories/components/sort-select.tsx";

const HeaderTablet = () => {
  return (
    <div className="w-full lg:hidden px-4 py-20 max-w-5xl flex flex-col justify-center items-center gap-4">
      <Brand className={{icon: "w-20"}} headline="ALL STORIES" direction="col" />
      <Search />
      <div className="flex justify-center items-center gap-2">
        <SortSelect />
      </div>
    </div>
  );
};

export default HeaderTablet;