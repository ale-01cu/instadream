import MoonIconDark from './MoonIcon'
import SunIconLight from './SunIcon'
import useAuth from '../../hooks/useAuth'
import { Button } from '@nextui-org/react'

// Botton para cambiar el modo de toda la app
export default function DarkMode ({ classname }) {
  const { isDarkMode, setIsDarkMode } = useAuth()

  return (
    <Button 
      onClick={() => setIsDarkMode(!isDarkMode)} 
      className={classname}
      color='warning'
      variant='light'
    >
      {
        isDarkMode
          ? <SunIconLight/>
          : <MoonIconDark/>
      }
    </Button>
  )

}