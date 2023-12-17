import User from '../models/user.js'
import UserUpdateError from '../errors/UserUpdateError.js'

export default async function updateUser ({ input }, context) {
  const { username, id } = context.user
  try {
    return await User.findByIdAndUpdate(id, input)
  } catch (error) {
    console.error(error)
    console.error(`Error al actualizar los datos del usuario: ${username} en la base de datos.`.red)
    throw new UserUpdateError('Lo sentimos, no se pudo actualizar los datos.')
  }
}
