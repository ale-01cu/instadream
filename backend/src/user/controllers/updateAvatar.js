import User from '../models/user.js'
import 'colors'
import { UPLOAD_ROOT } from '../../../config/baseConfig.js'

export default async function updateAvatar (req, res) {
  const { id } = req.user

  try {
    const path = req.file.path.split(UPLOAD_ROOT)[1]
    await User.findByIdAndUpdate(id, { avatar: path })
    return res.json({ avatar: path })
  } catch (error) {
    console.error(error)
    console.error('Ha ocurrido un error al actualizar el path del avatar del usuario'.red)
  }

  return res
    .status(500)
    .json({ error: 'Lo sentimos, no se pudo actualizar el avatar del usuario.' })
}
