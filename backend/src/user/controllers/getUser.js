import User from '../models/user.js'

export default async function getUser (_, args) {
  const { username } = args
  const user = await User.findOne({ username })
  if (user) return user
  else throw new Error(`No existe el usuario ${username}.`)
}
