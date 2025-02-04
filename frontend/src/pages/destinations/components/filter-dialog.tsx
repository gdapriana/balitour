import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {ArrowDown} from "lucide-react";
import Filter from "@/pages/destinations/components/filter.tsx";

const FilterDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">Filter <ArrowDown /></Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] h-[80vh] overflow-y-auto z-[999999]">
        <Filter />
      </DialogContent>
    </Dialog>
  )
}

export default FilterDialog;