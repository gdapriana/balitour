import Brand from "@/components/ui/brand.tsx";
import Search from "@/pages/destinations/components/search.tsx";
import SortSelect from "@/pages/destinations/components/sort-select.tsx";
import FilterDialog from "@/pages/destinations/components/filter-dialog.tsx";

const HeaderTablet = () => {
  return (
    <div className="w-full lg:hidden px-4 py-20 max-w-5xl flex flex-col justify-center items-center gap-4">
      <Brand className={{icon: "w-20"}} headline="ALL DESTINATIONS" direction="col" />
      <Search />
      <div className="flex justify-center items-center gap-2">
        <FilterDialog />
        <SortSelect />
      </div>
    </div>
  );
};

export default HeaderTablet;