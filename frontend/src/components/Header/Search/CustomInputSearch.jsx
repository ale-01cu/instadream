import { Input } from "@nextui-org/react"
import SearchIcon from "./SearchIcon"

// Input para buscar un poco mas personalizable
// que de momento se utiliza para la vista movil
export default function CustomInputSearch({ search, setSearch }) {
  
  const handleChange = (e) => {
    const text = e?.target?.value
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
        innerWrapper: "bg-transparent",
      }}
      placeholder="Type to search..."
      startContent={
        <SearchIcon className="w-6 h-6" />
      }
    />
  )
}