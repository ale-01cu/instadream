import User from '../models/user.js'
import deleteFile from '../utils/deleteFile.js'

export default async function deleteAvatar ({ context }) {
  const { id, username } = context.user

  try {
    const user = await User.findById(id)
    const isDelete = deleteFile(user.avatar)
    if (isDelete) {
      user.avatar = ''
      await user.save()
      return true
    }
  } catch (error) {
    console.error(error)
    console.error('Error al eliminar el avatar del usuario: '.red + username)
  }

  return false
}
