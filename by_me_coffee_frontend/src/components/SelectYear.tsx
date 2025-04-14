import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectYear = ({
  onValueChange,
  defaultValue,
}: {
  onValueChange: (value: string) => void;
  defaultValue: string;
}) => {
  const now = new Date().getUTCFullYear();
  const years = Array.from({ length: 31 }, (_, idx) => now + idx);
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Select a Month" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        <SelectGroup>
          <SelectLabel>Month</SelectLabel>
          {years.map((year, index) => (
            <SelectItem key={index} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectYear;
