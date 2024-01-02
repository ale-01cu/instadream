import Follow from '../models/follow.js'
import User from '../../user/models/user.js'
import UserNotFoundError from '../../user/errors/UserNotFoundError.js'
import 'colors'

export default async function isFollow (args, context) {
  const { username } = args
  const followerUser = context.user

  try {
    const followingUser = await User.findOne({ username })

    if (!followingUser) throw new UserNotFoundError('No existe el usuario a seguir ' + username)

    const isFollow = await Follow.findOne({
      follower: followerUser.id,
      following: followingUser._id
    })

    if (isFollow) return true
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al comprobar si un usuario esta siendo seguido.'.red)
  }

  return false
}
