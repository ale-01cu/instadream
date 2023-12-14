import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Input, Textarea } from '@nextui-org/react'

export default function EditProfileForm() {
  
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      webSite: '',
      description: '',
      location: ''
    },

    validationSchema: Yup.object({
      name: Yup
        .string('El nombre debe de ser un texto.')
        .max(60, 'El nombre debe de tener como maximo 50 caracteres.')
        .required('El nombre es obligatorio.'),
      username: Yup
        .string('El nombre de usuario debe de ser un texto')
        .matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacio.")
        .max(20, 'El nombre de usuario debe de tener como maximo 20 caracteres.')
        .required('El nombre de usuario es obligatorio.'),
      webSite: Yup
        .string('El nombre de usuario debe de ser un texto')
        .max(100, 'El sitio web debe de tener como maximo 100 caracteres.'),
      location: Yup
        .string('La localizacion debe de ser un texto.')
        .max(30, 'La localizacion debe de tener como maximo 30 caracteres.')
    }),

    onSubmit: async () => {
      console.log("se hizo submit");
    }
  })



  return (
    <form action="" className='flex gap-y-5 flex-col'>
      <Input
        isClearable
        type="name"
        name='name'
        label="Nombre"
        labelPlacement='inside'
        onChange={formik.handleChange}
        value={formik.values.name}
        onClear={() => formik.setFieldValue('name', '')}
        variant='bordered'
        isInvalid={formik.errors.name ? true : false}
      />
      <Input
        isClearable
        type="username"
        name='username'
        label="Nombre de Usuario"
        labelPlacement='inside'
        onChange={formik.handleChange}
        value={formik.values.username}
        onClear={() => formik.setFieldValue('username', '')}
        variant='bordered'
        isInvalid={formik.errors.username ? true : false}
      />
      <Input
        isClearable
        type="webSite"
        name='webSite'
        label="Sitio Web"
        labelPlacement='inside'
        onChange={formik.handleChange}
        value={formik.values.webSite}
        onClear={() => formik.setFieldValue('webSite', '')}
        variant='bordered'
      />
      <Textarea
        label="Descripcion"
        name='description'
        variant="bordered"
        placeholder="Escriba su descripcion..."
        disableAnimation
        disableAutosize
        classNames={{
          base: "",
          input: "resize-y min-h-[40px] bg-[transparent]",
        }}
      />
      <Input
        isClearable
        type="location"
        name='location'
        label="Localización"
        labelPlacement='inside'
        onChange={formik.handleChange}
        value={formik.values.location}
        onClear={() => formik.setFieldValue('location', '')}
        variant='bordered'
      />
    </form>
  )
}