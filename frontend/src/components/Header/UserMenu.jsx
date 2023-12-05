import {  
  DropdownItem, 
  DropdownTrigger, 
  Dropdown, 
  DropdownMenu, 
  Avatar
} from '@nextui-org/react'
import AvatarIcon from './AvatarIcon'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'


export default function UserMenu() {
  const { auth, logout } = useAuth()
  const { username, photo = '' } = auth

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        {
          photo
            ? <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={name}
                size="sm"
                src={photo}
              />

            : <Avatar
                isBordered
                as="button"
                className="transition-transform"
                name={name}
                size="sm"
                fallback={
                  <AvatarIcon className="animate-pulse w-6 h-6 text-default-500" fill="currentColor" size={20} />
                }
              />
        }
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="settings">
          <Link to={`/${username}`}>
            Mi Perfil
          </Link>
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