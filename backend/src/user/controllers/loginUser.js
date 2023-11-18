import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import createToken from '../helpers/createToken.js'

export default async function login (user) {
  const { email, password } = user

  const userFound = await User.findOne({ email: email.toLowerCase() })
  if (!userFound) throw new Error('Email o password incorrectos.')

  const passwordSucess = await bcrypt.compare(password, userFound.password)
  if (!passwordSucess) throw new Error('Email o password incorrectos.')

  const SECRET_KEY = process.env.SECRET_KEY
  const expiresInToken = process.env.TOKEN_EXPIRATION
  const token = createToken(userFound, SECRET_KEY, expiresInToken)

  return {
    token
  }
}
