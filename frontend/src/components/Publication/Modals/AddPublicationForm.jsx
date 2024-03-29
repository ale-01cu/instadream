import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Textarea } from "@nextui-org/react";
import { toast } from "react-toastify";
import createPublication from '../../../services/createPublication';

// Folumario para crear las publicaciones
export default function AddPublicationForm({ images = [], setImages, onClose, setIsLoading }){
  const formik = useFormik({
    initialValues: {
      description: ''
    },
    validationSchema: Yup.object({
      description: Yup
        .string('La description debe de ser un string.')
        .max(250)
    }),
    onSubmit: async (d) => {
      try {
        if(formik.values.description || images.length > 0) {
          setIsLoading(true)
          const formData = new FormData()
          formData.append('description', d.description)
          images.forEach(image => formData.append('content', image))

          const { res } = await createPublication(formData)
          
          setIsLoading(false)
          if(res.status > 299) toast
            .error('Upss, lo sentimos, no se pudo crear la publicación. :(')
          else {
            setImages([])
            onClose()
          }
        }
      
      } catch (error) {
        console.error(error);
      }
    }
  })

  return (
    <form 
      id="add-publication" 
      onSubmit={formik.handleSubmit}>

      <div className="mb-5">
        <Textarea
          label="Que Piensa"
          name='description'
          variant="bordered"
          disableAnimation
          disableAutosize
          value={formik.values.description}
          onChange={formik.handleChange}
          isInvalid={formik.errors.description && true}
          classNames={{
            base: "",
            input: "resize-y min-h-[40px] bg-[transparent]",
          }}
        />
      </div>
      <div className={`
        grid 
        ${images.length === 1 || images.length === 2 
          ? 'grid-cols-1' 
          : 'grid-cols-2'
        }
      `}>
        {
          images.map((image, index) => (
            <div 
              key={index} 
              className={`${
                images.length === 3 && index === 2 
                  ? 'col-span-2' 
                  : ''
                }`
              }
            >
              <img 
                className={
                  `block mx-auto h-full 
                  ${images.length === 3 && index === 2 
                      ? 'object-contain' 
                      : 'object-cover'
                  } 
                  object-center`
                } 
                src={URL.createObjectURL(image)} 
              />
            </div>
          ))
        }
      </div>

    </form>
  )   
}