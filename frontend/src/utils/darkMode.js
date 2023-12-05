import { DARKMODE } from './constants'

export const getDarkMode = () => {

  return window.localStorage.getItem(DARKMODE)

}


export const setDarkMode = ( value = '0' ) => {

  window.localStorage.setItem(DARKMODE, value)
  const html = window.document.querySelector('html')
  
  if(value == '1') html.classList = 'dark'
  else html.classList = ''

}