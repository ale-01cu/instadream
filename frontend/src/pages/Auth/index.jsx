import {useState} from 'react'
import RegisterForm from '../../components/Auth/RegisterAuth'
import LoginForm from '../../components/Auth/LoginAuth'

export default function Auth () {
  const [ showLogin, setShowLogin ] = useState(true)

  return (
    <div className='flex justify-center items-center'>
      <div className='w-96 h-screen flex justify-center items-center py-10 flex-col'>
        <div className='w-full p-10'>

          <div className='mb-10'>
            <h1 className='font-bold text-5xl italic text-center'>INSTADREAM</h1>
            <h2 className='px-5 font-semibold text-center'>
              Registrate para ver fotos y videos de tus amigos.
            </h2>
          </div>

          <div className='w-full mb-5'>
            {
              showLogin
                ? <LoginForm/>
                : <RegisterForm/>
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