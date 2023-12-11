import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function UserNotFound() {

  return (
    <div className="text-center mt-56">
      <p className="font-extrabold text-4xl mb-10">Usuario no encontrado.</p>
      <p className="mb-10">
        Es posible que el enlace que ha seguido sea incorrecto o que el usuario se haya eliminado.
      </p>
      <Link to={'/'}>
        <Button
          color="primary"
          variant="solid"
        >
          Volver a Home
        </Button>
      </Link>
    </div>
  )
}