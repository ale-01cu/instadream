import { DARKMODE } from './constants'

export const getDarkMode = () => {

  return window.localStorage.getItem(DARKMODE)

}


export const setDarkMode = ( value = '0' ) => {

  window.localStorage.setItem(DARKMODE, value)
  if(value == '1') document.documentElement.classList.add('dark') 
  else document.documentElement.classList.remove('dark')

}