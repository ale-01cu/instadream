import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import createToken from '../utils/createToken.js'
import { SECRET_KEY, TOKEN_EXPIRATION } from '../../../config/baseConfig.js'
import LoginError from '../errors/LoginError.js'
import LoginEmailOrPassError from '../errors/LoginEmailOrPassError.js'

import 'colors'

export default async function login (user) {
  const { email, password } = user

  try {
    const userFound = await User.findOne({ email: email.toLowerCase() })
    if (!userFound) throw new LoginEmailOrPassError()

    const passwordSucess = await bcrypt.compare(password, userFound.password)
    if (!passwordSucess) throw new LoginEmailOrPassError()

    const expiresInToken = TOKEN_EXPIRATION
    const token = createToken(userFound, SECRET_KEY, expiresInToken)

    return {
      token
    }
  } catch (error) {
    console.error(error)
    console.error('Ha ocurrio un error al loguear un usuario.'.red)
    if (error instanceof LoginEmailOrPassError) throw new LoginEmailOrPassError()
    else throw new LoginError('Lo sentimos, no se pudo autenticar al usuario.')
  }
}
