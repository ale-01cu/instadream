import connectToDatabase from './config/db.js'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import typeDefsUser from './src/user/gql/schemaUsers.js'
import resolversUser from './src/user/gql/resolversUser.js'

const port = process.env.PORT
connectToDatabase()

const server = async () => {
  const apolloServer = new ApolloServer({
    typeDefs: [typeDefsUser],
    resolvers: [resolversUser]
  })
  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port }
  })

  console.log(`🚀 Server ready at: ${url}`)
}

server()
