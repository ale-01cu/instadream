import { decode } from 'jsonwebtoken'
import 'colors'

const getUser = token => {
  try {
    return decode(token)
  } catch (error) {
    console.error(error)
    console.error('Error al decodificar el token'.red)
  }
}

export default getUser
