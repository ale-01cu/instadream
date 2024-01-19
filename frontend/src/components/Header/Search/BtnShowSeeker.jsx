import SearchIcon from "./SearchIcon"
import { Button } from "@nextui-org/react"

// Button para vista movil que permite
// mostrar el modal donde se encuentra
// el buscador
export default function BtnShowSeeker({ onOpen }) {
  return (
    <Button 
      className="sm:hidden px-0 min-w-unit-10" 
      color="warning"
      variant="light"
      onPress={onOpen}
    >
      <SearchIcon className='w-6 h-6'/>
    </Button>
  )
}