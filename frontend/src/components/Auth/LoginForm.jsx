import {Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx';
import {Button} from "@nextui-org/react";
import PhraseForm from "./PhraseForm.jsx";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {LOGIN} from '../../gql/user.js'
import { useMutation } from "@apollo/client";
import { toast } from 'react-toastify'
import { decodeToken, setToken } from '../../utils/token.js'
import useAuth from '../../hooks/useAuth.jsx'
import { useState } from "react";


export default function Login () {
  const [ isRemember, setIsRemember ] = useState(false)
  const [ login, { loading } ] = useMutation(LOGIN)
  const { setUser } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email("El email no es valido.")
        .required(true, 'El password es obligatorio.'),
      password: Yup
        .string()
        .required(true, 'El password es obligatorio.')
    }),
    onSubmit: async (formData) => {
      try {
        const { data } = await login({
          variables: { user: formData }
        })
        const { token } = data.login
        setToken(token, isRemember)
        setUser(decodeToken(token))
      } catch (error) {
        toast.error(error.message)
        console.error(error);
      }
    }
  })

  return (
    <div>
      <PhraseForm text={'Entra para ver fotos y videos de tus amigos.'}/>
      <form id="form-login" className="space-y-3" onSubmit={formik.handleSubmit}>
        <Input
          endContent={
            <MailIcon 
              className="text-2xl text-default-400 pointer-events-none flex-shrink-0" 
            />
          }
          classNames={{
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ]
          }}
          label="Email"
          name="email"
          placeholder="Enter your email"
          variant="bordered"
          onChange={formik.handleChange}
          value={formik.values.email}
          isInvalid={formik.errors.email && true}
        />
        <Input
          endContent={
            <LockIcon 
              className="text-2xl text-default-400 pointer-events-none flex-shrink-0" 
            />
          }
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={formik.errors.password && true}
        />
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
            name="remember"
            value={isRemember}
            onChange={() => setIsRemember(!isRemember)}
          >
            Remember me
          </Checkbox>
          <Link color="primary" href="#" size="sm">
            Forgot password?
          </Link>
        </div>
        <Button 
          color="primary" 
          className='mt-4 w-full' 
          type='submit' 
          isLoading={loading ? true : false}>
            Iniciar Sesion
        </Button>
      </form>
    </div>
    
  )

}