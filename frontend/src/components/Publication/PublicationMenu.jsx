import BtnDelete from "./DeleteIcon";
import {
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button } from "@nextui-org/react";
import MenuPublicationIcon from "./MenuPublicationIcon";
import { DELETE_PUBLICATION } from "../../gql/publication";
import { useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { LIST_PUBLICATION } from "../../gql/publication";


// Un boton que despliega un menu para diferentes opciones
// en cada una de las publications
export default function PublicationMenu({ idPublication }) {
  const [deletePublication] = useMutation(DELETE_PUBLICATION)
  const client = useApolloClient()

  const handleDelete = async () => {
    try {

      const data = await deletePublication({
        variables: { id: idPublication }
      })
      const isDeleted = data?.data?.deletePublication
      if(isDeleted) await client.refetchQueries({
        include: [LIST_PUBLICATION]
      })
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="light"
          className="px-unit-2 min-w-unit-0" 
        >
          <MenuPublicationIcon/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        variant="faded" 
        aria-label="Dropdown menu with icons"
      >
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<BtnDelete/>}
          onPress={handleDelete}
        >
          Borrar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}