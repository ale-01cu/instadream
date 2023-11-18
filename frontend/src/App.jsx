import { ApolloProvider } from '@apollo/client'
import client from './config/apollo'

function App() {
  return (
    <ApolloProvider client={client}>
      <h1>Hello word</h1>
    </ApolloProvider>
  )
}

export default App
