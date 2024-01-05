import { Link } from 'react-router-dom'
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent,
  NavbarItem, 
} from "@nextui-org/react";
import InstadreamLogo from './InstadreamLogo'
import DarkModeButton from '../DarkMode'
import SearchForm from './Search/SearchForm'
import UserMenu from '../User/UserMenu'

export default function Header() {

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link to={'/'} className='flex gap-x-3 justify-center items-center'>
            <InstadreamLogo/>
            <p className="hidden sm:block font-bold text-lg">Instadream</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="" justify="end">
        
        <DarkModeButton classname={'duration-200'}/>
        <SearchForm/>
        <UserMenu/>
        
      </NavbarContent>
    </Navbar>
  )
}