import jwt from 'jsonwebtoken'
import 'colors'

export default function createToken (user, SECRET_KEY, expiresIn) {
  const { id, name, email, username } = user

  const payload = {
    id,
    name,
    email,
    username
  }

  try {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
  } catch (error) {
    console.error(error)
    console.error('Error al crear un nuevo token.'.red)
  }
}
