import Follow from '../models/follow.js'
import User from '../../user/models/user.js'
import 'colors'
import UserNotFoundError from '../../user/errors/UserNotFoundError.js'
import FollowMySelfError from '../errors/FollowMySelfError.js'

export default async function createFollow ({ args, context }) {
  const followerUser = context.user

  try {
    const { username } = args
    // Validando que los dos usuarios no sean iguales.
    if (username === followerUser.username) { throw new FollowMySelfError('Error al intentar seguirse a si mismo un usuario.') }

    const user = await User.findOne({ username })
    if (!user) throw new UserNotFoundError('El usuario no existe.')

    const newFollow = new Follow({
      follower: context.user.id,
      following: user._id
    })

    newFollow.save()
    return true
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al crear un nuevo follow de usuarios.'.red)
  }

  return false
}
