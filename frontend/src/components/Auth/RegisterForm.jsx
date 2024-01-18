import { Input, Button } from "@nextui-org/react";
import { MailIcon } from './MailIcon.jsx';
import { LockIcon } from './LockIcon.jsx';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from "@apollo/client";
import { REGISTER } from '../../gql/user.js'
import { toast } from 'react-toastify'
import PhraseForm from './PhraseForm.jsx'

export default function RegisterForm ( props ) {
  const { setShowLogin } = props
  const [ register, { loading } ] = useMutation(REGISTER)

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    },

    validationSchema: Yup.object({
      name: Yup
        .string('El nombre debe de ser un texto.')
        .required('El nombre es obligatorio.'), 
      username: Yup
        .string('El nombre de usuario debe de ser un texto')
        .matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacio.")
        .required('El nombre de usuario es obligatorio.'),
      email: Yup
        .string('El email debe de ser un texto')
        .email("El email no es valido")
        .required("El email es obligatorio."),
      password: Yup
        .string('El password debe de ser un texto')
        .required("El password es obligatorio.")
        .min(6, 'El password debe de tener como minimo 6 caracteres.')
        .max(25)
        .oneOf([Yup.ref("repeatPassword")], "Los passwords no coinciden."),
      repeatPassword: Yup
        .string('El confirmar password debe de ser un texto')
        .required("El password es obligatorio.")
        .min(6, 'El confirmar password debe de tener como minimo 6 caracteres.')
        .max(25)
        .oneOf([Yup.ref("password")], "Los passwords no coinciden."),
    }),
    
    onSubmit: async (formData) => {
      try {
        const newUser = formData
        delete newUser.repeatPassword
        await register({
          variables: { user: newUser }
        })
        toast.success("Se ha registrado correctamente.")

        // Cambial del registro al login
        setShowLogin(true)

      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }
    }
  })

  return (
    <div>
      <PhraseForm text={'Registrate para ver fotos y videos de tus amigos.'}/>
      <form 
        id="form-register" 
        className="space-y-3"
        onSubmit={formik.handleSubmit}
      >
        <Input
          label="Nombre"
          placeholder="Escriba su nombre y apellidos"
          variant="bordered"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          isInvalid={formik.errors.name ? true : false}
        />
        <Input
          label="Nombre de usuario"
          placeholder="Escriba su nombre de usuario"
          variant="bordered"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={formik.errors.username ? true : false}
        />
        <Input
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Email"
          placeholder="Enter your email"
          variant="bordered"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          isInvalid={formik.errors.email ? true : false}
        />
        <Input
          endContent={
            <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Password"
          placeholder="Escriba su password"
          type="password"
          variant="bordered"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.passwrod}
          isInvalid={formik.errors.password ? true : false}
        />
        <Input
          endContent={
            <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Repeat Password"
          placeholder="Escriba su password una vez mas"
          type="password"
          variant="bordered"
          name="repeatPassword"
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          isInvalid={formik.errors.repeatPassword ? true : false}
        />
        <Button 
          color="primary" 
          className='mt-4 w-full' 
          type='submit' 
          isLoading={loading ? true : false}>
            Registrarme
        </Button>  
      </form>
    </div>
    
  )
}
