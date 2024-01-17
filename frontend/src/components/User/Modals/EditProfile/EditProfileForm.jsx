import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Input, Textarea, Button } from '@nextui-org/react'
import { UPDATE_USER, GET_USER } from '../../../../gql/user'
import { useMutation } from '@apollo/client'
import { useApolloClient } from '@apollo/client'
import { toast } from 'react-toastify'

export default function EditProfileForm({ userData, onClose }) {
  const { 
    name, 
    username, 
    webSite, 
    description, 
    location ,
    birthDate
  } = userData
  const [ updateUser, { loading } ] = useMutation(UPDATE_USER)
  const client = useApolloClient()

  const formik = useFormik({
    initialValues: {
      name: !name ? '' : name,
      username: !username ? '' : username,
      webSite: !webSite ? '' : webSite,
      description: !description ? '' : description,
      location: !location ? '' : location,
      birthDate: !birthDate 
        ? '' 
        : new Date(Number(birthDate)).toISOString().substring(0, 10)
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
        .max(30, 'La localizacion debe de tener como maximo 30 caracteres.'),
      birthDate: Yup
        .date('Este campo debe de ser una fecha con el formato dd/mm/yyyy.')
        .min(new Date(1900, 0, 1).toISOString().substring(0, 10), 'Fecha Invalida.')
        .max(new Date(Date.now()).toISOString().substring(0, 10), 'Fecha Invalida.')
    }),

    onSubmit: async (formData) => {
      try {
        await updateUser({
          variables: {
            input: formData
          }
        })
  
        onClose()
  
        formData.birthDate = new Date(formData.birthDate).getTime()
  
        const { getUser } = client.readQuery({
          query: GET_USER,
          variables: {
            username
          }
        });
  
        client.writeQuery({
          query: GET_USER,
          data: { getUser: {...getUser, ...formData} },
          variables: { username },
        });
        
      } catch (error) {
        console.error(error);
        toast.error(error.message)
      }

    }
  })



  return (
    <form 
      id='update-avatar-form' 
      onSubmit={formik.handleSubmit} 
      className='flex gap-y-5 flex-col'
    >
      <Input
        isClearable
        type="text"
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
        type="text"
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
        type="url"
        name='webSite'
        label="Sitio Web"
        labelPlacement='inside'
        onChange={formik.handleChange}
        value={formik.values.webSite}
        onClear={() => formik.setFieldValue('webSite', '')}
        variant='bordered'
        isInvalid={formik.errors.webSite ? true : false}
      />
      <Textarea
        label="Descripcion"
        name='description'
        variant="bordered"
        placeholder="Escriba su descripcion..."
        disableAnimation
        disableAutosize
        value={formik.values.description}
        onChange={formik.handleChange}
        classNames={{
          base: "",
          input: "resize-y min-h-[40px] bg-[transparent]",
        }}
      />
      <Input
        isClearable
        type="text"
        name='location'
        label="Localización"
        labelPlacement='inside'
        onChange={formik.handleChange}
        value={formik.values.location}
        onClear={() => formik.setFieldValue('location', '')}
        variant='bordered'
        isInvalid={formik.errors.location ? true : false}
      />
      <Input
        isClearable
        type="date"
        name='birthDate'
        label="Fecha de Nacimiento"
        labelPlacement='inside'
        onChange={formik.handleChange}
        value={formik.values.birthDate}
        onClear={() => formik.setFieldValue('birthDate', '')}
        variant='bordered'
        isInvalid={formik.errors.birthDate ? true : false}
      />
      <Button 
        color="primary" 
        type="submit" 
        isLoading={loading}
        className='mt-5'
      >
        Actuaizar
      </Button>
    </form>
  )
}