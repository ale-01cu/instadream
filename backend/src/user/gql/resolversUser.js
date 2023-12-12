import register from '../controllers/registerUsers.js'
import login from '../controllers/loginUser.js'
import getUser from '../controllers/getUser.js'
import verifyToken from '../controllers/verifyToken.js'
import deleteAvatar from '../controllers/deleteAvatar.js'

const resolvers = {
  Query: {
    getUser: (_, args) => getUser(_, args)
  },
  Mutation: {
    register: (_, { user }) => register(user),
    login: (_, { user }) => login(user),
    verifyToken: (_, { token }) => verifyToken(token),
    deleteAvatar: (_, args, context) => deleteAvatar(context)
  }
}

export default resolvers
