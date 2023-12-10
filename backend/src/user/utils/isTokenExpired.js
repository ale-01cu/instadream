import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../../config/baseConfig.js'

export default function isTokenExpired (token) {
  try {
    jwt.verify(token, SECRET_KEY)
    return true
  } catch (err) {
    return false
  }
}
