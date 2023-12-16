import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import FieldIsUsedError from '../errors/FieldIsUsedError.js'
import RegisterError from '../errors/RegisterError.js'
import 'colors'

// Registra un usuario
export default async function register (user) {
  const newUser = user
  newUser.email = user.email.toLowerCase()
  newUser.username = user.username.toLowerCase()
  const { email, username, password } = newUser

  try {
    // Revisar si el email esta en uso
    const foundEmail = await User.findOne({ email })
    if (foundEmail) throw new FieldIsUsedError('El Email ya esta en uso.')

    // Revisar si el username esta en uso
    const foundUsername = await User.findOne({ username })
    if (foundUsername) throw new FieldIsUsedError('El Username ya esta en uso.')

    // Encriptar Password
    const salt = await bcrypt.genSaltSync(10)
    newUser.password = await bcrypt.hash(password, salt)

    const user = new User(newUser)
    await user.save()
    return user
  } catch (e) {
    console.error(e)
    console.error(`Error al crear al usuario ${newUser.email}`.red)

    if (e instanceof FieldIsUsedError) throw e
    else throw new RegisterError()
  }
}
