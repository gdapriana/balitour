import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Dispatch, SetStateAction} from "react";

const SortSelect = ({ sortBy }: {
  sortBy: {value: string; setValue: Dispatch<SetStateAction<string>>}
}) => {
  return (
    <Select value={sortBy.value} onValueChange={(e) => sortBy.setValue(e)}>
      <SelectTrigger className="rounded-full">
        <SelectValue itemID="name" placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem itemID="name" value="name">Sort by: Name</SelectItem>
          <SelectItem itemID="favorited" value="favorited">Sort by: Favorited</SelectItem>
          <SelectItem itemID="liked" value="liked">Sort by: Liked</SelectItem>
          <SelectItem itemID="commented" value="commented">Sort by: Commented</SelectItem>
          <SelectItem itemID="price" value="price">Sort by: price</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SortSelect;