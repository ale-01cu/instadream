import register from '../controllers/registerUsers.js'
import login from '../controllers/loginUser.js'
import getUser from '../controllers/getUser.js'
import verifyToken from '../controllers/verifyToken.js'

const resolvers = {
  Query: {
    getUser: (_, args, contextValue) => getUser(_, args, contextValue)
  },
  Mutation: {
    register: (_, { user }) => register(user),
    login: (_, { user }) => login(user),
    verifyToken: (_, { token }) => verifyToken(token)
  }
}

export default resolvers
