import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SortSelect = () => {
  return (
    <Select>
      <SelectTrigger className="rounded-full">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="rounded-full">Sort By</SelectLabel>
          <SelectItem value="name">Sort by: Name</SelectItem>
          <SelectItem value="favorited">Sort by: Favorited</SelectItem>
          <SelectItem value="liked">Sort by: Liked</SelectItem>
          <SelectItem value="commented">Sort by: Commented</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SortSelect;