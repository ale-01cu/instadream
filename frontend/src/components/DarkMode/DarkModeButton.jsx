import MoonIconDark from './MoonIcon'
import SunIconLight from './SunIcon'
import useAuth from '../../hooks/useAuth'

export default function DarkMode ({classname}) {
  const { isDarkMode, setIsDarkMode } = useAuth()


  return (
    <button 
      onClick={() => setIsDarkMode(!isDarkMode)} 
      className={classname}
    >
      {
        isDarkMode
          ? <SunIconLight/>
          : <MoonIconDark/>
      }
    </button>
  )

}