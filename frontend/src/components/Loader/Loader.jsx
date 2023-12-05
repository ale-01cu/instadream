import {Spinner} from "@nextui-org/spinner";

export default function Loader(){

  return (
    <div className="flex gap-4">
      <Spinner 
        size="lg" 
        color="warning"
      />
    </div> 

  )
}