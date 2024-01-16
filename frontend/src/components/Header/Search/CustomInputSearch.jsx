import { Input } from "@nextui-org/react"
import SearchIcon from "./SearchIcon"

export default function CustomInputSearch({ handleChange }) {
  return (
    <Input
      onChange={handleChange}
      isClearable
      radius="lg"
      classNames={{
        label: "",
        input: '',
        innerWrapper: "bg-transparent",
        inputWrapper: '',
      }}
      placeholder="Type to search..."
      startContent={
        <SearchIcon className="w-6 h-6" />
      }
    />
  )
}