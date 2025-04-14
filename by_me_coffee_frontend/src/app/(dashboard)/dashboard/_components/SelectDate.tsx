import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const SelectDate = ({onValueChange, defaultValue}:{onValueChange:(value: string) => void, defaultValue : string}) => {
    return (
        <Select defaultValue={defaultValue} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px] ">
          <SelectValue placeholder="Select days" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Days</SelectLabel>
            <SelectItem value="30">Last 30days</SelectItem>
            <SelectItem value="90">Last 3month</SelectItem>
            <SelectItem value="10000">All time</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
}
export default SelectDate