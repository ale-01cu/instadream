import { TOKEN } from './constants'
import { jwtDecode } from 'jwt-decode'

export function setToken(token) {

  window.localStorage.setItem(TOKEN, token);

}


export function getToken() {

  return window.localStorage.getItem(TOKEN);

}


export function decodeToken(token) {
  
  return jwtDecode(token)

}


export function deleteToken() {

  window.localStorage.removeItem(TOKEN)
  const token = getToken()
  if(token) return false
  return true

}