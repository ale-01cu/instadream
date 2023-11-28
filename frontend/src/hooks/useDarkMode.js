import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [ isDarkMode, setIsDarkMode ] = useState(false)
  
  useEffect(() => {
    
    const isDarkModeLocalStorage = window.localStorage.getItem('darkmode')
    if(isDarkModeLocalStorage && isDarkModeLocalStorage === '1') {
      
      setIsDarkMode(true)
      
    }
    
  }, [])


  useEffect(() => {
    
    if (isDarkMode) {

      window.localStorage.setItem('darkmode', '1')
      const html = window.document.querySelector('html')
      html.classList = 'dark'

    } else {

      window.localStorage.setItem('darkmode', '0')
      const html = window.document.querySelector('html')
      html.classList = ''

    }

  }, [isDarkMode])


  return [isDarkMode, setIsDarkMode]


}