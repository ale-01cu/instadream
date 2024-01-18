import { USER_UPLOAD_AVATAR_URL } from "../utils/constants"
import { getSessionStorageToken } from "../utils/token"

// Envia el avatar al servidor
export default async function updateAvatar(formData) {
  try {
    const res = await fetch(USER_UPLOAD_AVATAR_URL, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${getSessionStorageToken()}`
      },
      body: formData,
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