import { useEffect, useState } from "react";
import { getDarkMode, setDarkMode } from '../utils/darkMode'

export default function useDarkMode() {
  const [ isDarkMode, setIsDarkMode ] = useState(false)
  
  useEffect(() => {
    
    const isDarkModeLocalStorage = getDarkMode()
    if(isDarkModeLocalStorage && isDarkModeLocalStorage === '1') {
      
      setIsDarkMode(true)
      
    }
    
  }, [])


  useEffect(() => {
    
    if (isDarkMode) setDarkMode('1')
    else setDarkMode('0')

  }, [isDarkMode])


  return [isDarkMode, setIsDarkMode]


}