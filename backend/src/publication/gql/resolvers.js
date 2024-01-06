import listAllPublication from '../controllers/listAllPublication.js'
import listPublication from '../controllers/listPublication.js'
import deletePublication from '../controllers/deletePublication.js'
import middlewareController from '../../user/middlewares/middlewaresController.js'
import authorizationMiddlewareGQL from '../../user/middlewares/authorizationGQL.js'

const resolvers = {
  Query: {
    listAllPublication: (_, args, context) => middlewareController(
      args,
      context,
      [authorizationMiddlewareGQL],
      listAllPublication
    ),

    listPublication: (_, args, context) => middlewareController(
      args,
      context,
      [authorizationMiddlewareGQL],
      listPublication
    )
  },
  Mutation: {
    deletePublication: (_, args, context) => middlewareController(
      args,
      context,
      [authorizationMiddlewareGQL],
      deletePublication
    )
  }
}

export default resolvers
