import Brand from "@/components/ui/brand.tsx";
import Search from "@/pages/destinations/components/search.tsx";
import SortSelect from "@/pages/destinations/components/sort-select.tsx";

const HeaderDesktop = () => {
  return (
    <div className="w-full hidden lg:flex justify-between items-center">
      <Brand headline="ALL DESTINATIONS" className={{icon: "w-8"}} direction="row" />
      <div className="flex justify-center items-center gap-4">
        <Search />
        <SortSelect />
      </div>
    </div>
  );
};

export default HeaderDesktop;