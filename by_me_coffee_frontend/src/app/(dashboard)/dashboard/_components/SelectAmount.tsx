import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const SelectAmount = ({onValueChange, amounts}:{onValueChange:(value: string) => void, amounts :number[] }) => {
    return (
        <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-[100px] row-reverse ">
          <SelectValue placeholder="Amount" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Amount</SelectLabel>
            {amounts.map((amount, index) => (
              <SelectItem key={index} value={amount.toString()}>
                ${amount}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
}
export default SelectAmount