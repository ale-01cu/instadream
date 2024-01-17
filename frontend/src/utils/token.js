import { TOKEN } from './constants'
import { jwtDecode } from 'jwt-decode'

export function setToken(token, isSessionStorage) {

  window.sessionStorage.setItem(TOKEN, token)
  if(isSessionStorage) window.localStorage.setItem(TOKEN, token);

}

export function getLocalStorageToken () {

  return window.localStorage.getItem(TOKEN);

}


export function getSessionStorageToken() {

  return window.sessionStorage.getItem(TOKEN);

}


export function decodeToken(token) {
  
  return jwtDecode(token)

}


export function deleteToken() {

  window.localStorage.removeItem(TOKEN)
  window.sessionStorage.removeItem(TOKEN)
  const token = getLocalStorageToken() && getSessionStorageToken()
  if(token) return false
  return true

}