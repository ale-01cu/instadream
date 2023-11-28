import MoonIconDark from './MoonIconDark'
import SunIconLight from './SunIconLight'
import useAuth from '../../hooks/useAuth'

export default function DarkMode () {
  const { isDarkMode, setIsDarkMode } = useAuth()


  return (
    <div className='fixed top-0 right-0 m-10'>
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)} 
        className='bg-primary hover:bg-primary-300 rounded-2xl p-2 duration-200'
      >
        {
          isDarkMode
            ? <SunIconLight/>
            : <MoonIconDark/>
        }
      </button>
    </div>
  )

}