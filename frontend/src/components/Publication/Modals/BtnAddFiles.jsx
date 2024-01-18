import { useRef } from "react";
import BtnAddFilesIcon from "./BtnAddFilesIcon";
import { Button } from "@nextui-org/react";
import { toast } from 'react-toastify'

// Btn para agregar ficheros a la publicacion
export default function BtnAddFiles({ setImages }) {
  const inputFileRef = useRef(null)

  const handleButtonClick = () => {
    // activa el click del input file
    inputFileRef.current.click();
  };

  const handleChange = (e) => {
    const imagesArray = [...e.target.files]
    if(imagesArray.length > 4) toast
      .warning('Solo puede enviar como maximo 4 archivos.')
    setImages(imagesArray.slice(0, 4))
  }

  return (
    <>
      <input 
        type="file" 
        multiple
        name="content"
        hidden 
        accept="image/jpeg, image/png"
        ref={inputFileRef}
        onChange={handleChange}
      />
      <Button 
        isIconOnly 
        aria-label="add-publication" 
        color='primary'
        onPress={handleButtonClick}
      >
        <BtnAddFilesIcon className='w-4 h=4'/>
      </Button>
    
    </>
  )
}