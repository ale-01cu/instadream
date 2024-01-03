import EditProfileForm from "./EditProfileForm";
import {
  Modal, 
  ModalContent,
  ModalHeader, 
  ModalBody, 
  Button, 
  useDisclosure
} from "@nextui-org/react";

export default function EditProfile({ userData }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="default" variant="bordered" className="w-full">
        Editar Perfil
      </Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        scrollBehavior='inside'
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Perfil
              </ModalHeader>
              <ModalBody className="p-10">
                <EditProfileForm userData={userData} onClose={onClose}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}