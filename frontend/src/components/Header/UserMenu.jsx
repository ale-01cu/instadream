import {  
  DropdownItem, 
  DropdownTrigger, 
  Dropdown, 
  DropdownMenu, 
  Avatar
} from '@nextui-org/react'
import AvatarIcon from './AvatarIcon'
import useAuth from '../../hooks/useAuth'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../gql/user'
import { BASE_URL } from '../../utils/constants'

export default function UserMenu() {
  const { auth, logout } = useAuth()
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username: auth.username }
  })

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
      <DropdownTrigger>
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
          <p className="font-semibold">Conectado como:</p>
          <p className="font-semibold">{auth.username}</p>
        </DropdownItem>
        <DropdownItem key="settings" href={`/${auth.username}`}>
          Mi Perfil
        </DropdownItem>

        <DropdownItem key="configurations">Configuraciones</DropdownItem>
        <DropdownItem key="help_and_feedback">Ayuda</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => logout()}>
          Cerrar Sesion
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}