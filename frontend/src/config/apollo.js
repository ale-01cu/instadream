import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GRAPHQL_URL } from '../utils/constants'

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
})

export default client