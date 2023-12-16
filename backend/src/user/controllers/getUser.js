import User from '../models/user.js'
import 'colors'
import UserNotFoundError from '../errors/UserNotFoundError.js'

export default async function getUser (_, args) {
  try {
    const { username } = args
    const user = await User.findOne({ username })
    if (user) return user
    else throw new UserNotFoundError(`No existe el usuario ${username}.`)
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al obtener un usuario en el controlador: '.red + 'getUser'.yellow)

    if (error instanceof UserNotFoundError) throw error
  }
}
