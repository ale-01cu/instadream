import isTokenExpired from '../utils/isTokenExpired.js'

export default async function verifyToken ({ token }) {
  return isTokenExpired(token)
}
