import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import createToken from '../utils/createToken.js'
import { SECRET_KEY } from '../../../config/baseConfig.js'

export default async function login (user) {
  const { email, password } = user

  const userFound = await User.findOne({ email: email.toLowerCase() })
  if (!userFound) throw new Error('Email o password incorrectos.')

  const passwordSucess = await bcrypt.compare(password, userFound.password)
  if (!passwordSucess) throw new Error('Email o password incorrectos.')

  const expiresInToken = process.env.TOKEN_EXPIRATION
  const token = createToken(userFound, SECRET_KEY, expiresInToken)

  return {
    token
  }
}
