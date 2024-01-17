import User from '../models/user.js'
import 'colors'
import { PAGINATION_LIMIT } from '../../../config/baseConfig.js'

export default async function searchUsers (req, res) {
  try {
    const { s, lastId } = req.query
    const { username } = req.user

    let query = {}
    if (lastId) {
      query = { _id: { $gt: lastId } }
    }

    const users = await User.find({
      $and: [
        {
          username: { $ne: username }
        },
        query,
        {
          $or: [
            { name: { $regex: s, $options: 'i' } },
            { username: { $regex: s, $options: 'i' } }
          ]
        }
      ]
    })
      .select('-password -createAt -status')
      .skip({ _id: 1 })
      .limit(PAGINATION_LIMIT + 1)

    let next = false

    if (users.length > PAGINATION_LIMIT) {
      next = true
      users.pop()
    }

    return res.json({
      data: users,
      next
    })
  } catch (error) {
    console.error(error)
    console.error('Error al realizar una busqueda de usuarios.'.red)
    return res
      .status(500)
      .json({ message: 'La busqueda fallo.' })
  }
}
