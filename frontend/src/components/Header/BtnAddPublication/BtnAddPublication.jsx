import AddIcon from './AddIcon'
import { Button } from '@nextui-org/react'
import { useDisclosure } from '@nextui-org/react'
import AddPublicationModal from '../../Publication/Modals/AddPublication';

// Boton encargado de mostrar el modal
// que contiene el formulario para agregar
// publicaciones
export default function BtnAddPublication() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} 
        isIconOnly 
        aria-label="add-publication" 
        className='hover:scale-110' 
        color='warning'
        variant='light'
      >
        <AddIcon />
      </Button>
      
      <AddPublicationModal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
      />
    </>

  )
}