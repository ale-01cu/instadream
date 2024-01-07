import { getToken } from "../../../utils/token";
import { PUBLICATION_URL } from '../../../utils/constants'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Textarea } from "@nextui-org/react";
import { toast } from "react-toastify";

export default function AddPublicationForm({ images = [], onClose, setIsLoading }){
  const formik = useFormik({
    initialValues: {
      description: ''
    },
    validationSchema: Yup.object({
      description: Yup
        .string()
        .max(250)
    }),
    onSubmit: async (data) => {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('description', data.description)
      images.forEach(image => formData.append('content', image))

      try {
        const res = await fetch(PUBLICATION_URL, {
          method: 'post',
          headers: {
            Authorization: `Bearer ${getToken()}`
          },
          body: formData
        })

        await res.json()
        
        setIsLoading(false)
        if(res.status > 299) toast.error('Upss, lo sentimos, no se pudo crear la publicación. :(')
        else {
          onClose()
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
      <div className={`grid ${images.length === 1 || images.length === 2 ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {
          images.map((image, index) => (
            <div 
              key={index} 
              className={
                `${images.length === 3 && index === 2 ? 'col-span-2' : ''}`
              }
            >
              <img 
                className={
                  `block mx-auto h-full 
                  ${images.length === 3 && index === 2 ? 'object-contain' : 'object-cover'} 
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