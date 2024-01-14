import AddIcon from './AddIcon'
import { Button } from '@nextui-org/react'
import { useDisclosure } from '@nextui-org/react'
import AddPublicationModal from '../../Publication/Modals/AddPublication';

export default function BtnAddPublication() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} 
        isIconOnly 
        aria-label="add-publication" 
        className='' 
        color='success'
      >
        <AddIcon />
      </Button>
      <AddPublicationModal isOpen={isOpen} onOpenChange={onOpenChange}/>
    </>

  )
}