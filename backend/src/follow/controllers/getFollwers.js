import Follow from '../models/follow.js'
import User from '../../user/models/user.js'
import UserNotFoundError from '../../user/errors/UserNotFoundError.js'
import FollowersError from '../errors/FollowersError.js'

export default async function followers (args, context) {
  const { username } = args

  try {
    const user = await User.findOne({ username })
    if (!user) throw new UserNotFoundError('No existe el usuario: ' + username)

    const followersUsers = await Follow
      .find({ following: user._id })
      .populate('follower')

    return followersUsers.map(follow => follow.follower)
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al buscar los seguidores de un usuario.'.red)
    throw new FollowersError('Ocurrio un error al buscar los usuarios seguidores.')
  }
}
