import connectToDatabase from './config/db.js'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import typeDefsUser from './src/user/gql/schema.js'
import typeDefsFollow from './src/follow/gql/schemas.js'
import typeDefsPublication from './src/publication/gql/schemas.js'
import resolversUser from './src/user/gql/resolvers.js'
import resolverFollow from './src/follow/gql/resolvers.js'
import resolverPublication from './src/publication/gql/resolvers.js'
import getUser from './src/user/utils/getUser.js'
import express from 'express'
import http from 'http'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import userRouter from './src/user/routes/index.js'
import publicationRouter from './src/publication/routes/index.js'
import { PORT } from './config/baseConfig.js'
import morgan from 'morgan'

connectToDatabase()

const app = express()
const httpServer = http.createServer(app)

const apolloServer = new ApolloServer({
  typeDefs: [typeDefsUser, typeDefsFollow, typeDefsPublication],
  resolvers: [resolversUser, resolverFollow, resolverPublication],
  cache: 'bounded',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

await apolloServer.start()

app.use(express.static('upload'))
app.use(cors())
app.use(morgan('dev'))
// app.use(graphqlUploadExpress({ maxFileSize: 10000, maxFiles: 1 }))
app.use('/user', userRouter)
app.use('/publication', publicationRouter)
app.use('/graphql',
  cors({ origin: ['https://localhost'] }),
  express.json({ limit: '50mb' }),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(apolloServer, {
    context: async ({ req }) => ({
      user: getUser(req.headers.authorization?.replace('Bearer ', '')),
      token: req.headers.authorization?.replace('Bearer ', '')
    })
  })
)

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
console.log(`🚀 Server ready at http://localhost:${PORT}/`)
