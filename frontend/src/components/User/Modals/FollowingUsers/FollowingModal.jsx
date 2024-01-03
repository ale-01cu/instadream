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
import { GET_FOLLOWING } from '../../../../gql/follow'
import AvatarIcon from '../../../Header/AvatarIcon'
import { BASE_URL } from '../../../../utils/constants'
import { Link } from 'react-router-dom'

export default function FollowingModal({ isOpen, onOpenChange, username }) {
  const { data, loading, error } = useQuery(GET_FOLLOWING, {
    variables: { username }
  })

  if(loading) return null
  if(error) return null

  const { following } = data

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
                Siguiendo
              </ModalHeader>

              <ModalBody className="py-5">
                <div className='flex flex-col items-start gap-y-3 p-2 w-11/12'>
                  {
                    following.map(f => (
                      <Link key={f.id} className='w-full' to={'/' + f.username}>
                        <User
                          className='hover:bg-default-200 p-2 w-full flex justify-start'   
                          name={f.name}
                          description={f.username}
                          avatarProps={{
                            src: f.avatar ? BASE_URL + '/' + f.avatar : undefined,
                            fallback: !f.avatar && <AvatarIcon 
                                                    className="animate-pulse w-6 h-6 text-default-500" 
                                                    fill="currentColor" 
                                                    size={20} />
                          }}
                        />
                      </Link>
                    ))
                  }
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
  )
}