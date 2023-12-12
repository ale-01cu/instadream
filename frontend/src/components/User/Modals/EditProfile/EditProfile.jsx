import EditProfileForm from "./EditProfileForm";
import {
  Modal, 
  ModalContent,
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  useDisclosure
} from "@nextui-org/react";

export default function EditProfile() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="default" variant="bordered">
        Editar Perfil
      </Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        scrollBehavior='inside'
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Perfil
              </ModalHeader>
              <ModalBody className="p-10">
                <EditProfileForm/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}