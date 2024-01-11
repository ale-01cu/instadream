import { Link } from 'react-router-dom'
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent,
} from "@nextui-org/react";
import InstadreamLogo from './InstadreamLogo'
import DarkModeButton from '../DarkMode'
import SearchForm from './Search/SearchForm'
import UserMenu from '../User/UserMenu'
import BtnAddPublication from './BtnAddPublication/BtnAddPublication';

export default function Header() {

  return (
    <Navbar>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link to={'/'} className='flex gap-x-3 justify-center items-center'>
            <InstadreamLogo/>
            <p className="hidden sm:block font-bold text-lg">Solaris</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="" justify="end">
        
        <BtnAddPublication/>
        <DarkModeButton classname={'duration-200 px-0 min-w-unit-10'}/>
        <SearchForm/>
        <UserMenu/>
        
      </NavbarContent>
    </Navbar>
  )
}