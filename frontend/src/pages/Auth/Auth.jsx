import {useState} from 'react'
import RegisterForm from '../../components/Auth/RegisterForm'
import LoginForm from '../../components/Auth/LoginForm'
import DarkModeButton from '../../components/DarkMode'


export default function Auth () {
  const [ showLogin, setShowLogin ] = useState(true)

  return (
    <div className='flex justify-center items-center'>
      <div className='fixed top-0 right-0 m-10'>
        <DarkModeButton classname={'hover:bg-primary rounded-2xl p-2 duration-200'}/>
      </div>

      <div className='w-96 h-screen flex justify-center items-center py-10 flex-col'>
        <div className='w-full p-10'>

          <div className=''>
            <h1 className='font-extrabold text-5xl italic text-center'>INSTADREAM</h1>
          </div>

          <div className='w-full mb-5'>
            {
              showLogin
                ? <LoginForm/>
                : <RegisterForm setShowLogin={setShowLogin}/>
            }
          </div>

          <div>
            {
              showLogin
                ? <div className='text-center mt-2'>
                    ¿No tienes cuenta?
                    <span 
                      className='text-action cursor-pointer' 
                      onClick={() => setShowLogin(!showLogin)}>
                        Registrarme
                    </span>
                  </div>

                : <div className='text-center mt-2'>
                    ¡Entra con tu cuenta!
                    <span 
                      className='text-action cursor-pointer' 
                      onClick={() => setShowLogin(!showLogin)}>
                        Iniciar Sesion
                    </span>
                  </div>
            }
          </div>

        </div>
        
      </div>

    </div>
  )
}