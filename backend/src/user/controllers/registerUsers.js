import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import 'colors'

// Registra un usuario
export default async function register (user) {
  const newUser = user
  newUser.email = user.email.toLowerCase()
  newUser.username = user.username.toLowerCase()
  const { email, username, password } = newUser

  // Revisar si el email esta en uso
  const foundEmail = await User.findOne({ email })
  if (foundEmail) throw new Error('El Email ya esta en uso.')

  // Revisar si el username esta en uso
  const foundUsername = await User.findOne({ username })
  if (foundUsername) throw new Error('El Username ya esta en uso.')

  // Encriptar Password
  const salt = await bcrypt.genSaltSync(10)
  newUser.password = await bcrypt.hash(password, salt)

  try {
    const user = new User(newUser)
    user.save()
    return user
  } catch (e) {
    console.log(e)
    console.log(`Error al crear al usuario ${newUser.email}`.red)
  }
}
