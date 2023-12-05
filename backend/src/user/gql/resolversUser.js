import register from '../controllers/registerUsers.js'
import login from '../controllers/loginUser.js'
import getUser from '../controllers/getUser.js'
import updateAvatar from '../controllers/updateAvatar.js'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    getUser: (_, args, contextValue) => getUser(_, args, contextValue)
  },
  Mutation: {
    register: (_, { user }) => register(user),
    login: (_, { user }) => login(user),
    updateAvatar: (_, { file }) => updateAvatar(file)
  }
}

export default resolvers
