import { ApolloProvider } from '@apollo/client'
import { useState } from 'react'
import client from './config/apollo'
import Auth from './pages/Auth'
import {NextUIProvider} from "@nextui-org/react";
import {ToastContainer} from 'react-toastify'


function App() {
  const { auth, setAuth } = useState(false)

  return (
    <ApolloProvider client={client}>
      <NextUIProvider>
        {
          !auth
            ? <Auth/>
            : <div>Esta logueado</div> 
        }
      </NextUIProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ApolloProvider>
  )
}

export default App
