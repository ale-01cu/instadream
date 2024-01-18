import { SEARCH_USERS_URL } from "../utils/constants"
import { getSessionStorageToken } from "../utils/token"

// Envia el input de busqueda al servidor
export default async function searchUsers ( search = '', lastId = '' ) {
  try {
    const url = `${SEARCH_USERS_URL}?s=${search}&lastId=${lastId}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${getSessionStorageToken()}` }
    })
    const data = await res.json()
    return data
    
  } catch (error) {
    console.error("There was an error with the fetch operation:", error);
    
  }
}