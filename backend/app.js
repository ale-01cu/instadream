import connectToDatabase from './config/db.js'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import typeDefsUser from './src/user/gql/schemaUsers.js'
import resolversUser from './src/user/gql/resolversUser.js'
import getUser from './src/user/helpers/getUser.js'

const port = process.env.PORT
connectToDatabase()

const apolloServer = new ApolloServer({
  typeDefs: [typeDefsUser],
  resolvers: [resolversUser],
  cache: 'bounded'
})

const server = async () => {
  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port },
    context: async ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || ''

      // try to retrieve a user with the token
      const user = getUser(token)

      // add the user to the context
      return { user }
    }
  })

  console.log(`🚀 Server ready at: ${url}`)
}

server()
