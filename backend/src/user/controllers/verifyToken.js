import isTokenExpired from '../utils/isTokenExpired.js'

export default async function verifyToken (req, res) {
  return isTokenExpired(req.headers.authorization)
}
