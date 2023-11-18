import User from '../models/user.js'

export default async function listUser () {
  const users = await User.find()
  return users
}
