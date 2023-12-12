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
    console.log(error)
    console.log('Ha ocurrido un error al actualizar el path del avatar del usuario'.red)
  }
}
