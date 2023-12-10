import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { GRAPHQL_URL } from '../utils/constants'
import { setContext } from '@apollo/client/link/context';
import { getToken } from '../utils/token'

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext(() => ({
  headers: {authorization: getToken()}
}))

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client