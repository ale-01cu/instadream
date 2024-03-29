import { useState, useEffect, useMemo } from 'react'
import Auth from './pages/Auth'
import {NextUIProvider} from "@nextui-org/react";
import {ToastContainer} from 'react-toastify'
import { decodeToken } from './utils/token'
import AuthContext from './contexts/AuthContext'
import useDarkMode from './hooks/useDarkMode'
import Navigation from './routes/Navegation';
import { useNavigate } from 'react-router-dom';
import useVerifyToken from './hooks/useVerifyToken';
import connectWithIndexDB from './config/indexDB';

function App() {
  const [ 
    isValid, 
    tokenInMemory, 
    tokenInLocalStorage 
  ] = useVerifyToken()
  const [ auth, setAuth ] = useState(null)
  const [ isDarkMode, setIsDarkMode ] = useDarkMode()
  const navegate = useNavigate()
  
  useEffect(() => {
    connectWithIndexDB()
  }, [])

  useEffect(() => {
    if(tokenInMemory) setAuth(decodeToken(tokenInMemory))
    else setAuth(null)
    
  }, [ tokenInMemory ])

  
  const setUser = user => {
    setAuth(user)
  }

  const authData = useMemo(() => ({
    auth,
    setUser,
    isDarkMode,
    setIsDarkMode,
  }),[ auth, isDarkMode, setIsDarkMode ])

    
  if(tokenInLocalStorage && auth === null) return null

  return (
    <AuthContext.Provider value={authData}>
      <NextUIProvider navigate={navegate}>
        {
          !auth && !isValid
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
  )
}

export default App
