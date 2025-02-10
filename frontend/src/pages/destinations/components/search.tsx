import { Input } from "@/components/ui/input.tsx";
import { SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useDebounceCallback } from "usehooks-ts";

const Search = ({ setName }: { setName: Dispatch<SetStateAction<string>> }) => {
  const debounced = useDebounceCallback(setName, 500);
  return (
    <main className="flex bg-white w-full max-w-xl border rounded-full justify-center items-center gap-2 px-4">
      <Input
        onChange={(e) => debounced(e.target.value)}
        className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:text-base focus:outline-0 placeholder:text-base ring-offset-0 border-none p-0"
        placeholder="destinations..."
      />
      <SearchIcon />
    </main>
  );
};

export default Search;
