import User from '../models/user.js'

export default async function updateUser (args, context) {
  const { username, id } = context.user

  try {
    await User.findByIdAndUpdate(id, args)
    return true
  } catch (error) {
    console.error(error)
    console.error(`Error al actualizar los datos del usuario: ${username} en la base de datos.`.red)
  }

  return false
}
