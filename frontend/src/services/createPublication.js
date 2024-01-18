import { PUBLICATION_URL } from "../utils/constants"
import { getSessionStorageToken } from "../utils/token"


// Evia la nueva publicacion al servidor
export default async function createPublication(formData) {
  try {
    const res = await fetch(PUBLICATION_URL, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${getSessionStorageToken()}`
      },
      body: formData
    })
  
    const data = await res.json()
    
    return {
      res,
      data
    }

  } catch (error) {
    console.error(error);
  }
}