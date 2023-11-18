import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const httpLink = createHttpLink({
  url: 'http://localhost:4000/'
})

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: httpLink
})

export default client