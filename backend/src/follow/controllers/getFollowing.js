import Follow from '../models/follow.js'
import User from '../../user/models/user.js'
import UserNotFoundError from '../../user/errors/UserNotFoundError.js'
import FollowersError from '../errors/FollowersError.js'

export default async function following (args, context) {
  const { username } = args

  try {
    const user = await User.findOne({ username })
    if (!user) throw new UserNotFoundError('No existe el usuario: ' + username)

    const followersUsers = await Follow
      .find({ follower: user._id })
      .populate('following')

    return followersUsers.map(follow => follow.following)
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al buscar los usuarios que sigue otro usuario.'.red)
    throw new FollowersError('Ocurrio un error al buscar los usuarios seguidos.')
  }
}
