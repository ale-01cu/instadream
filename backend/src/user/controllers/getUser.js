import User from '../models/user.js'

export default async function getUser (parent, args, contextValue) {
  console.log(contextValue)
  const { username } = args
  const user = await User.findOne({ username })
  if (user) return user
  else throw new Error(`No existe el usuario ${username}.`)
}
