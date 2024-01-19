import { useEffect, useState } from "react";
import { getDarkMode, setDarkMode } from '../utils/darkMode'

// Permite cambiar facilmente el modo oscuro de la app
export default function useDarkMode() {
  const [ isDarkMode, setIsDarkMode ] = useState(
    getDarkMode() === '1' 
      ? true 
      : false
  )

  useEffect(() => {
    
    if (isDarkMode) setDarkMode('1')
    else setDarkMode('0')

  }, [isDarkMode])


  return [isDarkMode, setIsDarkMode]


}