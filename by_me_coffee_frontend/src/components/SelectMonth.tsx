import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/lib/localFile";

const SelectMonth = ({
  onValueChange,
  defaultValue,
}: {
  onValueChange: (value: string) => void;
  defaultValue: string;
}) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Select a Month" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        <SelectGroup>
          <SelectLabel>Month</SelectLabel>
          {months.map((month, index) => (
            <SelectItem key={index} value={(index + 1).toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectMonth;
