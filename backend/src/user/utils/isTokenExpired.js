import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../../config/baseConfig.js'
import 'colors'

export default function isTokenExpired (token) {
  try {
    jwt.verify(token, SECRET_KEY)
    return true
  } catch (err) {
    console.error(err)
    console.error('Error validando la expiracion del token.'.red)
    return false
  }
}
