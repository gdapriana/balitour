import { Input } from "@/components/ui/input.tsx";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <main className="flex bg-white mt-4 w-full max-w-xl border rounded-full justify-center items-center gap-2 px-4 lg:py-2 lg:px-6">
      <Input
        className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:text-base focus:outline-0 placeholder:text-base ring-offset-0 border-none p-0"
        placeholder="destinations, cultures, stories..."
      />
      <SearchIcon />
    </main>
  );
};

export default Search;
