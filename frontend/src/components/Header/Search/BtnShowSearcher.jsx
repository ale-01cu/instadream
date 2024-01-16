import SearchIcon from "./SearchIcon"
import { Button } from "@nextui-org/react"

export default function BtnShowSearcher({ onOpen }) {
  return (
    <Button 
      className="sm:hidden px-0 min-w-unit-10" 
      color="warning"
      variant="solid"
      onPress={onOpen}
    >
      <SearchIcon className='w-6 h-6'/>
    </Button>
  )
}