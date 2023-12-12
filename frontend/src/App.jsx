import { ApolloProvider } from '@apollo/client'
import { useState, useEffect, useMemo } from 'react'
import client from './config/apollo'
import Auth from './pages/Auth'
import {NextUIProvider} from "@nextui-org/react";
import {ToastContainer} from 'react-toastify'
import { getToken, decodeToken } from './utils/token'
import AuthContext from './contexts/AuthContext'
import useDarkMode from './hooks/useDarkMode'
import Navigation from './routes/Navegation';
import { deleteToken } from './utils/token'
import { useNavigate } from 'react-router-dom';

function App() {
  const [ auth, setAuth ] = useState(null)
  const [ isDarkMode, setIsDarkMode ] = useDarkMode()
  const navegate = useNavigate()
  
  useEffect(() => {
    const token = getToken()
    if(token) setAuth(decodeToken(token))
    else setAuth(null)
    
  }, [ setAuth ])


  const logout = () => {
    const isDelete = deleteToken()
    if(isDelete) setAuth(null)

  }

  
  const setUser = user => {
    setAuth(user)
  }

  const authData = useMemo(() => ({
    auth,
    logout,
    setUser,
    isDarkMode,
    setIsDarkMode
  }),[ auth, isDarkMode, setIsDarkMode ])

    
  if(getToken() && auth === null) return null

  return (
    <ApolloProvider client={client}>
        <AuthContext.Provider value={authData}>
          <NextUIProvider navigate={navegate}>
            {
              !auth
                ? <Auth/>
                : <Navigation/>
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
