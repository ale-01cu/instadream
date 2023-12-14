import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  useDisclosure
} from "@nextui-org/react";
import CameraIcon from './CameraIcon'
import { useRef, useState } from "react"
import { BASE_URL } from '../../../../utils/constants'
import { getToken } from '../../../../utils/token'
import { GET_USER } from "../../../../gql/user";
import { useApolloClient } from '@apollo/client'
import { DELETE_AVATAR } from "../../../../gql/user";
import { useMutation } from "@apollo/client";
import { toast } from 'react-toastify'

export default function AvatarModal({ auth }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const inputFileRef = useRef(null);
  const [ isLoadingInput, setIsLoadingInput ] = useState(false)
  const client = useApolloClient()

  const handleButtonClick = () => {
    // activa el click del input file
    inputFileRef.current.click();
  };

  const handleChangeFile = async (e, onClose) => {
    const avatarfile = e.target.files[0]
    event.preventDefault()
    setIsLoadingInput(true)

    const formData = new FormData();
    formData.append('avatar', avatarfile);

    const response = await fetch(`${BASE_URL}/user/upload-avatar`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      body: formData,
    })
    const { avatar } = await response.json()

    setIsLoadingInput(false)
    onClose()

    // Actualiza la cache del avatar de graphql para que se visualize el nuevo avatar al cambio
    const { getUser } = client.readQuery({
      query: GET_USER,
      variables: {
        username: auth.username
      }
    });
    client.writeQuery({
      query: GET_USER,
      data: { getUser: { ...getUser, avatar } },
      variables: { username: auth.username },
    });

  }

  const [deleteAvatar, { loading }] = useMutation(DELETE_AVATAR)

  const handleDeleteAvatar = async (onClose) => {
    try {
      const { data } = await deleteAvatar()
      if(!data.deleteAvatar) toast.warning('No se pudo eliminar el avatar.')
      else {
        onClose()

        const { getUser } = client.readQuery({
          query: GET_USER,
          variables: {
            username: auth.username
          }
        });
        client.writeQuery({
          query: GET_USER,
          data: { getUser: { ...getUser, avatar: '' } },
          variables: { username: auth.username },
        });
      }

    } catch (error) {
      console.error(error);
      toast.warning('No se pudo eliminar el avatar.')
    }
  }

  return (
    <>
      <button onClick={onOpen} className="bg-primary p-3 rounded-full absolute right-2 top-[138px] hover:bg-primary-300 transition-colors">
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
                  <div action="" className="flex flex-col gap-y-7 px-10 sm:px-24">
                    <input 
                      type="file" 
                      name="avatar"
                      hidden 
                      ref={inputFileRef} 
                      accept="image/jpeg, image/png"
                      onChange={(e) => handleChangeFile(e, onClose)}
                    />
                    <Button 
                      onClick={handleButtonClick} 
                      color="secondary" 
                      size="sm"
                      isLoading={isLoadingInput}
                    >
                      Cargar una Foto
                    </Button>
                    <Button 
                      color="danger" 
                      size="sm" 
                      onClick={() => handleDeleteAvatar(onClose)} 
                      isLoading={loading}
                    >
                      Eliminar foto actual
                    </Button>
                  </div>
                </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}