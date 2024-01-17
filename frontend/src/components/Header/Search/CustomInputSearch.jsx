import { Input } from "@nextui-org/react"
import SearchIcon from "./SearchIcon"

export default function CustomInputSearch({ search, setSearch }) {
  
  const handleChange = (e) => {
    const text = e.target.value
    setSearch(text)
  }

  const handleClear = () => {
    setSearch('')
  }
  
  return (
    <Input
      onChange={handleChange}
      isClearable
      onClear={handleClear}
      value={search}
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