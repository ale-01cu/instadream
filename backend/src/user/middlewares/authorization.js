import isTokenExpired from '../utils/isTokenExpired.js'
import getUser from '../utils/getUser.js'

export default function authorizationMiddleware (req, res, next) {
  const token = req?.headers?.authorization?.replace('Bearer ', '')
  if (!token) {
    return res.status(401)
      .json({ error: 'Debe de estar logueado.' })
  }
  if (!isTokenExpired(token)) {
    return res.status(401)
      .json({ error: 'Token invalido.' })
  }

  req.user = getUser(token)
  req.token = token

  next()
}
