import { Button } from "@nextui-org/react"
import { useRef } from "react"
import { UPDATE_AVATAR } from "../gql/user";
import { useMutation } from "@apollo/client";

export default function AvatarForm() {
  const inputFileRef = useRef(null);
  const { updateAvatar } = useMutation(UPDATE_AVATAR)

  const handleButtonClick = () => {
    // activa el click del input file
    inputFileRef.current.click();
  };

  const handleChangeFile = e => {
    console.log(e.target.files[0]);
  }

  return (
    <div action="" className="flex flex-col gap-y-5 px-24">
      <input 
        type="file" 
        hidden 
        ref={inputFileRef} 
        accept="image/jpeg, image/png"
        onChange={handleChangeFile}
      />
      <Button onClick={handleButtonClick} color="secondary" size="sm">Cargar una Foto</Button>
      <Button color="danger" size="sm">Eliminar foto actual</Button>
    </div>
    
  )
}