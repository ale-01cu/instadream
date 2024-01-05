import {  
  DropdownItem, 
  DropdownTrigger, 
  Dropdown, 
  DropdownMenu, 
  Avatar,
  User
} from '@nextui-org/react'
import AvatarIcon from '../../Header/AvatarIcon'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../../gql/user'
import { BASE_URL } from '../../../utils/constants'
import { deleteToken } from '../../../utils/token'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useApolloClient } from '@apollo/client'

export default function UserMenu() {
  const { auth, setUser } = useAuth()
  const navegate = useNavigate()
  const client = useApolloClient()
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username: auth.username }
  })

  const handleLogout = async () => {
    const isDelete = deleteToken()
    if(isDelete) {
      setUser(null)
      navegate('/')
      await client.resetStore()
    }
    else toast.warning('No se pudo cerrar la sesion.')

  }

  if(loading || error) {
    return (
      <Avatar
        isBordered
        as="button"
        className="transition-transform"
        name={name}
        size="sm"
        fallback={
          <AvatarIcon 
            className="animate-pulse w-6 h-6 text-default-500" 
            fill="currentColor" 
            size={20}/>
        }
      />
    )
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className='min-w-[32px]'>
        {
          data.getUser.avatar
            ? <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={name}
                size="sm"
                src={BASE_URL + '/' + data.getUser.avatar}
              />

            : <Avatar
                isBordered
                as="button"
                className="transition-transform"
                name={name}
                size="sm"
                fallback={
                  <AvatarIcon 
                    className="animate-pulse w-6 h-6 text-default-500" 
                    fill="currentColor" 
                    size={20} />
                }
              />
        }
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">

        <DropdownItem key="profile" className="h-14 gap-2">
          {
            !data.getUser.avatar
              ? <User   
                  name={data.getUser.email}
                  description={data.getUser.username}
                  avatarProps={{
                    fallback: <AvatarIcon 
                              className="animate-pulse w-6 h-6 text-default-500" 
                              fill="currentColor" 
                              size={20} />
                  }}
                />
              : <User   
                  name={data.getUser.email}
                  description={data.getUser.username}
                  avatarProps={{
                    src: BASE_URL + '/' + data.getUser.avatar
                  }}
                />
          }
          
        </DropdownItem>

        <DropdownItem 
          key="settings" 
          href={`/${auth.username}`} 
          className='p-2'
        >
          Mi Perfil
        </DropdownItem>

        <DropdownItem 
          key="configurations" 
          className='p-2'
        >
          Configuraciones
        </DropdownItem>

        <DropdownItem 
          key="help_and_feedback" 
          className='p-2'
        >
          Ayuda
        </DropdownItem>

        <DropdownItem 
          key="logout" 
          color="danger" 
          onClick={() => handleLogout()} 
          className='p-2'
        >
          Cerrar Sesion
        </DropdownItem>

      </DropdownMenu>
    </Dropdown>
  )
}