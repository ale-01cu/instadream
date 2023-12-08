import connectToDatabase from './config/db.js'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import typeDefsUser from './src/user/gql/schemaUsers.js'
import resolversUser from './src/user/gql/resolversUser.js'
import getUser from './src/user/helpers/getUser.js'
import express from 'express'
import http from 'http'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import userRouter from './src/user/routes/index.js'

const app = express()
const httpServer = http.createServer(app)
const port = process.env.PORT || 4000

const apolloServer = new ApolloServer({
  typeDefs: [typeDefsUser],
  resolvers: [resolversUser],
  cache: 'bounded',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

const runServer = async () => {
  await apolloServer.start()

  app.use(cors())
  // app.use(graphqlUploadExpress({ maxFileSize: 10000, maxFiles: 1 }))
  app.use('/user', userRouter)
  app.use(
    '/graphql',
    cors({ origin: ['https://localhost'] }),
    express.json({ limit: '50mb' }),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ user: getUser(req.headers.token) })
    })
  )

  await new Promise((resolve) => httpServer.listen({ port }, resolve))
  console.log(`🚀 Server ready at http://localhost:${port}/`)
}

connectToDatabase()
runServer()
