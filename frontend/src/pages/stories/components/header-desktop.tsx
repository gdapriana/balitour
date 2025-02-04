import Brand from "@/components/ui/brand.tsx";
import Search from "@/pages/stories/components/search.tsx";
import SortSelect from "@/pages/stories/components/sort-select.tsx";

const HeaderDesktop = () => {
  return (
    <div className="w-full hidden lg:flex justify-between items-center">
      <Brand headline="ALL STORIES" className={{icon: "w-8"}} direction="row" />
      <Search />
      <SortSelect />
    </div>
  );
};

export default HeaderDesktop;