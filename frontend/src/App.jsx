import { ApolloProvider } from '@apollo/client'
import { useState } from 'react'
import client from './config/apollo'
import Auth from './pages/Auth'
import {NextUIProvider} from "@nextui-org/react";

function App() {
  const { auth, setAuth } = useState(undefined)

  return (
    <ApolloProvider client={client}>
      <NextUIProvider>
        {
          !auth
            ? <Auth/>
            : <div>Esta logueado</div> 
        }
      </NextUIProvider>
    </ApolloProvider>
  )
}

export default App
