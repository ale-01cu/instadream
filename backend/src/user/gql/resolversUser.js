import register from '../controllers/registerUsers.js'
import login from '../controllers/loginUser.js'

const resolvers = {
  Query: {
    getUser: () => {
      console.log('get usuarios')
      return null
    }
  },
  Mutation: {
    register: (_, { user }) => register(user),
    login: (_, { user }) => login(user)
  }
}

export default resolvers
