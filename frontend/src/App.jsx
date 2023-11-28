import { ApolloProvider } from '@apollo/client'
import { useState, useEffect, useMemo } from 'react'
import client from './config/apollo'
import Auth from './pages/Auth'
import {NextUIProvider} from "@nextui-org/react";
import {ToastContainer} from 'react-toastify'
import { getToken } from './utils/token'
import AuthContext from './contexts/AuthContext'
import Home from './pages/Home'
import useDarkMode from './hooks/useDarkMode'


function App() {
  const [ auth, setAuth ] = useState(null)
  const [ isDarkMode, setIsDarkMode ] = useDarkMode()

  useEffect(() => {

    const token = getToken()
    if(token) {
      setAuth(token)
    }else {
      setAuth(null)
    }

  }, [ setAuth ])


  const logout = () => {
    console.log('Cerrar Sesion');
  }

  const setUser = user => {
    setAuth(user)
  }

  const authData = useMemo(

    () => ({
      auth,
      logout,
      setUser,
      isDarkMode,
      setIsDarkMode
    })
    ,[ auth, isDarkMode, setIsDarkMode ]

  )

  return (
    <ApolloProvider client={client}>
        <AuthContext.Provider value={authData}>
          <NextUIProvider>
            {
              !auth
                ? <Auth/>
                : <Home/>
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
            theme={isDarkMode ? "dark" : "light"}
          />
      </AuthContext.Provider>
    </ApolloProvider>
  )
}

export default App
