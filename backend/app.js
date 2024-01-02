import connectToDatabase from './config/db.js'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import typeDefsUser from './src/user/gql/schemaUsers.js'
import typeDefsFollow from './src/follow/gql/schemasFollow.js'
import resolversUser from './src/user/gql/resolversUser.js'
import resolverFollow from './src/follow/gql/resolversFollow.js'
import getUser from './src/user/utils/getUser.js'
import express from 'express'
import http from 'http'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import userRouter from './src/user/routes/index.js'
import { PORT } from './config/baseConfig.js'
import morgan from 'morgan'

connectToDatabase()

const app = express()
const httpServer = http.createServer(app)

const apolloServer = new ApolloServer({
  typeDefs: [typeDefsUser, typeDefsFollow],
  resolvers: [resolversUser, resolverFollow],
  cache: 'bounded',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

await apolloServer.start()

app.use(express.static('upload'))
app.use(cors())
app.use(morgan('dev'))
// app.use(graphqlUploadExpress({ maxFileSize: 10000, maxFiles: 1 }))
app.use('/user', userRouter)
app.use('/graphql',
  cors({ origin: ['https://localhost'] }),
  express.json({ limit: '50mb' }),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(apolloServer, {
    context: async ({ req }) => ({
      user: getUser(req.headers.authorization),
      token: req.headers.authorization
    })
  })
)

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
console.log(`🚀 Server ready at http://localhost:${PORT}/`)
