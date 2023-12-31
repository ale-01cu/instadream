import register from '../controllers/registerUsers.js'
import login from '../controllers/loginUser.js'
import getUser from '../controllers/getUser.js'
import verifyToken from '../controllers/verifyToken.js'
import deleteAvatar from '../controllers/deleteAvatar.js'
import updateUser from '../controllers/updateUser.js'
import searchUsers from '../controllers/searchUsers.js'
import middlewaresController from '../middlewares/middlewaresController.js'
import authorizationMiddlewareGQL from '../middlewares/authorizationGQL.js'

const resolvers = {
  Query: {
    getUser: (_, args, context) => middlewaresController(
      args,
      context,
      [authorizationMiddlewareGQL],
      getUser
    ),

    searchUsers: (_, args, context) => middlewaresController(
      args,
      context,
      [authorizationMiddlewareGQL],
      searchUsers
    )
  },
  Mutation: {
    register: (_, { user }) => register(user),

    login: (_, { user }) => login(user),

    verifyToken: (_, args) => verifyToken(args),

    deleteAvatar: (_, args, context) => middlewaresController(
      args,
      context,
      [authorizationMiddlewareGQL],
      deleteAvatar
    ),

    updateUser: (_, args, context) => middlewaresController(
      args,
      context,
      [authorizationMiddlewareGQL],
      updateUser
    )
  }
}

export default resolvers
