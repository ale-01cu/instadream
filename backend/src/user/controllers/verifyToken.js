import isTokenExpired from '../utils/isTokenExpired.js'

export default function verifyToken (req, res) {
  return isTokenExpired(req.headers.authorization)
}
