import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import CameraIcon from './CameraIcon'
import { useRef, useState } from "react"
import { UPDATE_AVATAR } from '../../../gql/user'
import { useMutation } from "@apollo/client";

export default function AvatarModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const inputFileRef = useRef(null);
  const [ updateAvatar ] = useMutation(UPDATE_AVATAR)
  const [ avatarfile, setAvatarFile ] = useState(null)

  const handleButtonClick = () => {
    // activa el click del input file
    inputFileRef.current.click();
  };

  const handleChangeFile = e => {
    setAvatarFile(e.target.files[0])
  }

  const handleSubmit = async () => {
    const result = await updateAvatar({
      variables: {
        file: avatarfile
      } 
    }) 
    console.log(result);

  }


  return (
    <>
      <button onClick={onOpen} className="bg-primary p-3 rounded-full absolute right-0 top-36 hover:bg-primary-300 transition-colors">
        <CameraIcon/>
      </button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Subir Avatar</ModalHeader>
                <ModalBody>
                  <div action="" className="flex flex-col gap-y-5 px-24">
                    <input 
                      type="file" 
                      hidden 
                      ref={inputFileRef} 
                      accept="image/jpeg, image/png"
                      onChange={handleChangeFile}
                    />
                    <Button onClick={handleButtonClick} color="secondary" size="sm">Cargar una Foto</Button>
                    <Button color="danger" size="sm">Eliminar foto actual</Button>
                  </div>
                </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleSubmit}>
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}