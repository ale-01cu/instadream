import { 
  ApolloClient, 
  InMemoryCache, 
  createHttpLink 
} from '@apollo/client'
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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listAllPublication: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = {}, incoming) {
              const newData = {...incoming};
              if(existing.data) newData.data = [...existing.data, ...incoming.data]
              else  newData.data = [...incoming.data]
              return newData;
            },
          },
          listPublication: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = {}, incoming) {
              const newData = {...incoming};
              if(existing.data) newData.data = [...existing.data, ...incoming.data]
              else  newData.data = [...incoming.data]
              return newData;
            },
          }
        }
      }
    }
  }),
})

export default client