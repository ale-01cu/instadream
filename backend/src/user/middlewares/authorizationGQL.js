import TokenInvalidError from '../errors/TokenInvalidError.js'
import isTokenExpired from '../utils/isTokenExpired.js'
import TokenExpiredError from '../errors/TokenExpiredError.js'

export default function authorizationMiddlewareGQL ({ context, next }) {
  const { token } = context
  if (!token) {
    throw new TokenInvalidError('No Authorizado.')
  }
  if (!isTokenExpired(token)) {
    throw new TokenExpiredError('Token Invalido.')
  }
  next()
}
