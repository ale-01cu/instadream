import { useEffect, useState } from "react";
import { getDarkMode, setDarkMode } from '../utils/darkMode'

export default function useDarkMode() {
  const [ isDarkMode, setIsDarkMode ] = useState(
    getDarkMode() === '1' 
      ? true 
      : false
  )
  
  // useEffect(() => {
    
  //   const darkModeLocalStorage = getDarkMode()
  //   if(darkModeLocalStorage && darkModeLocalStorage === '1') {
      
  //     setIsDarkMode(true)
      
  //   }
    
  // }, [])

  useEffect(() => {
    
    if (isDarkMode) setDarkMode('1')
    else setDarkMode('0')

  }, [isDarkMode])


  return [isDarkMode, setIsDarkMode]


}