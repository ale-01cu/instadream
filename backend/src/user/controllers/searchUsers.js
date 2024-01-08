import User from '../models/user.js'
import 'colors'
import SearchError from '../errors/SearchError.js'

export default async function searchUsers ({ args, context }) {
  try {
    const { input } = args
    const { search, offset, limit } = input
    const { username } = context.user

    const count = await User.countDocuments({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } }
      ]
    })

    const users = await User.find({
      $and: [
        { username: { $ne: username } },
        {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { username: { $regex: search, $options: 'i' } }
          ]
        }
      ]
    })
      .skip(offset)
      .limit(limit)

    return {
      count,
      previous: offset === 0 ? null : offset - 1,
      next: count - (offset + limit) > 0 ? offset + limit : null,
      data: users
    }
  } catch (error) {
    console.error(error)
    console.error('Error al realizar una busqueda de usuarios.'.red)
    throw new SearchError('La busqueda fallo.')
  }
}
