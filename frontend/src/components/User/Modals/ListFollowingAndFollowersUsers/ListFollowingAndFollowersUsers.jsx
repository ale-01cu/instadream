import { 
  Modal, 
  ModalHeader, 
  ModalContent, 
  ModalBody,
  ModalFooter,
  Button,
  User
} from '@nextui-org/react'
import { useQuery } from '@apollo/client'
import AvatarIcon from '../../../Header/AvatarIcon'
import { BASE_URL } from '../../../../utils/constants'
import { Link } from 'react-router-dom'

// Modal para mostrar los usuarios que siguen
// y los seguidos por el usuario seleccionado
export default function ListFollowingAndFollowersUsers(props) {
  const { 
    isOpen, 
    onOpenChange, 
    username,
    queryGQL,
    queryName,
    headerText
  } = props
  const { data, loading, error } = useQuery(queryGQL, {
    variables: { username },
    fetchPolicy: 'network-only'
  })

  if(loading) return null
  if(error) return null

  const list = data[queryName]

  return (
    <>
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
                {headerText}
              </ModalHeader>

              <ModalBody className="py-5">
                <div className='flex flex-col items-start gap-y-3 p-2 w-11/12'>
                  {
                    list.map(f => (
                      <Link 
                        key={f.id} 
                        className='w-full' 
                        to={'/' + f.username}
                      >
                        <User
                          className='hover:bg-default-200 p-2 w-full flex justify-start'   
                          name={f.name}
                          description={f.username}
                          avatarProps={{
                            src: f.avatar 
                              ? BASE_URL + '/' + f.avatar 
                              : undefined,
                            fallback: !f.avatar && 
                              <AvatarIcon 
                                className="animate-pulse w-6 h-6 text-default-500" 
                                fill="currentColor" 
                                size={20} 
                              />
                          }}
                        />
                      </Link>
                    ))
                  }
                </div>
              </ModalBody>

              <ModalFooter>
                <Button 
                  color="danger" 
                  variant="flat"
                  onPress={onClose}
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}