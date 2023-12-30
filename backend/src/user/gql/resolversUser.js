import register from '../controllers/registerUsers.js'
import login from '../controllers/loginUser.js'
import getUser from '../controllers/getUser.js'
import verifyToken from '../controllers/verifyToken.js'
import deleteAvatar from '../controllers/deleteAvatar.js'
import updateUser from '../controllers/updateUser.js'
import searchUsers from '../controllers/searchUsers.js'

const resolvers = {
  Query: {
    getUser: (_, args) => getUser(_, args),
    searchUsers: (_, args, context) => searchUsers(args)
  },
  Mutation: {
    register: (_, { user }) => register(user),
    login: (_, { user }) => login(user),
    verifyToken: (_, { token }) => verifyToken(token),
    deleteAvatar: (_, args, context) => deleteAvatar(context),
    updateUser: (_, args, context) => updateUser(args, context)
  }
}

export default resolvers
