import MoonIconDark from './MoonIcon'
import SunIconLight from './SunIcon'
import useAuth from '../../hooks/useAuth'
import { Button } from '@nextui-org/react'

export default function DarkMode ({ classname }) {
  const { isDarkMode, setIsDarkMode } = useAuth()


  return (
    <Button 
      onClick={() => setIsDarkMode(!isDarkMode)} 
      className={classname}
      color='primary'
    >
      {
        isDarkMode
          ? <SunIconLight/>
          : <MoonIconDark/>
      }
    </Button>
  )

}