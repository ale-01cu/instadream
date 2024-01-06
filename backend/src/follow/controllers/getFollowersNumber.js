import FollowersError from '../errors/FollowersError.js'
import UserNotFoundError from '../../user/errors/UserNotFoundError.js'
import Follow from '../models/follow.js'
import User from '../../user/models/user.js'

export default async function getFollowersNumber ({ args }) {
  try {
    const { username } = args
    const user = await User.findOne({ username })
    if (!user) throw new UserNotFoundError('No existe el usuario: ' + username)

    return await Follow.countDocuments({
      following: user._id
    })
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al buscar los seguidores de un usuario.'.red)
    throw new FollowersError('Ocurrio un error al buscar los usuarios seguidores.')
  }
}
