import Follow from '../models/follow.js'
import User from '../../user/models/user.js'
import 'colors'
import UserNotFoundError from '../../user/errors/UserNotFoundError.js'
import FollowMySelfError from '../errors/FollowMySelfError.js'

export default async function unFollow ({ args, context }) {
  const followerUser = context.user

  try {
    const { username } = args
    // Validando que los dos usuarios no sean iguales.
    if (username === followerUser.username) {
      throw new FollowMySelfError('Error al intentar deseguirse a si mismo un usuario.')
    }

    const user = await User.findOne({ username })
    if (!user) throw new UserNotFoundError('No existe el usuario: ' + username)

    const deleted = await Follow.deleteOne({
      follower: followerUser.id,
      following: user._id
    })

    return deleted.deleteCount === 1
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al eliminar un follow de usuarios.'.red)
  }

  return false
}
