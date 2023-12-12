import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Input, Textarea } from '@nextui-org/react'

export default function EditProfileForm() {
  
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      webSite: '',
      description: ''
    },

    validationSchema: Yup.object({
      name: Yup
        .string('El nombre debe de ser un texto.')
        .required('El nombre es obligatorio.'), 
      username: Yup
        .string('El nombre de usuario debe de ser un texto')
        .matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacio.")
        .required('El nombre de usuario es obligatorio.'),
      webSite: Yup
        .string('El nombre de usuario debe de ser un texto')
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
        onClear={() => console.log("input cleared")}
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
        onClear={() => console.log("input cleared")}
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
        onClear={() => console.log("input cleared")}
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
    </form>
  )
}