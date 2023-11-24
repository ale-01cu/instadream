import {Input, Button} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx';
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function RegisterForm () {

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(true), 
      username: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacio")
        .required(),
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("El password es obligatorio")
        .min(6)
        .oneOf([Yup.ref("repeatPassword")], "Los passwords no coinciden"),
      repeatPassword: Yup.string()
        .required("El password es obligatorio")
        .min(6)
        .oneOf([Yup.ref("password")], "Los passwords no coinciden"),
    }),
    onSubmit: (formValues) => {
      console.log("formulario enviado");
      console.log(formValues);
    }
  })

  return (
    <form id="form-register" action="" className="space-y-3" onSubmit={formik.handleSubmit}>
      <Input
        label="Nombre"
        placeholder="Escriba su nombre y apellidos"
        variant="bordered"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        isInvalid={formik.errors.name && true}
      />
      <Input
        label="Nombre de usuario"
        placeholder="Escriba su nombre de usuario"
        variant="bordered"
        name="username"
        onChange={formik.handleChange}
        value={formik.values.username}
        isInvalid={formik.errors.username && true}
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
        isInvalid={formik.errors.email && true}
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
        isInvalid={formik.errors.password && true}
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
        isInvalid={formik.errors.repeatPassword && true}
      />
      <Button color="primary" className='mt-4 w-full' type='submit'>
        Registrarme
      </Button>  
    </form>
  )
}

/*
estoy utilizando la libreria yup de js para validar los inputs de mi formulario pero tengo un problema y es que cuando escribvo en el primer input automaticamente me pone el resto de inputs en rojo como si estuvieran mal, pero yo no he escrito aun en esos inputs, osea que no deberia de salir en rojo, osea lo que quiero es que si no se ha escrito aun en el input que no los valiide, Este es el codigo export default function RegisterForm () {

const formik = useFormik({
initialValues: {
name: '',
username: '',
email: '',
password: '',
repeatPassword: ''
},
validationSchema: Yup.object({
name: Yup.string()
.required(true),
username: Yup.string()
.matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacio")
.required(),
email: Yup.string()
.email("El email no es valido")
.required("El email es obligatorio"),
password: Yup.string()
.required("El password es obligatorio")
.min(6)
.oneOf([Yup.ref("repeatPassword")], "Los passwords no coinciden"),
repeatPassword: Yup.string()
.required("El password es obligatorio")
.min(6)
.oneOf([Yup.ref("password")], "Los passwords no coinciden"),
}),
onSubmit: (formValues) => {
console.log("formulario enviado");
console.log(formValues);
}
})

return (
<form id="form-register" action="" className="space-y-3" onSubmit={formik.handleSubmit}>
<Input label="Nombre" placeholder="Escriba su nombre y apellidos" variant="bordered" name="name" onChange={formik.handleChange} value={formik.values.name} isInvalid={formik.errors.name} />
<Input label="Nombre de usuario" placeholder="Escriba su nombre de usuario" variant="bordered" name="username" onChange={formik.handleChange} value={formik.values.username} isInvalid={formik.errors.username} />
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
isInvalid={formik.errors.email}
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
isInvalid={formik.errors.password}
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
isInvalid={formik.errors.repeatPassword}
/>
<Button color="primary" className='mt-4 w-full' type='submit'>
Registrarme
</Button>
</form>
)
}

*/