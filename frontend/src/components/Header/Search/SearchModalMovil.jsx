import {
  Modal, 
  ModalContent,
  ModalHeader, 
  ModalBody, 
  useDisclosure,
} from "@nextui-org/react";
import CustomInputSearch from "./CustomInputSearch";
import useSearchUsers from "../../../hooks/useSearchUsers";
import { useState } from "react";
import Loader from '../../Loader'
import UserItem from "./UserItem";
import RecientSearch from "./RecientSearch";
import useRecientSearch from "../../../hooks/useRecientSearch";
import BtnShowSeeker from "./BtnShowSeeker";

// Modal que contiene el buscador en la vista movil
export default function SearchModalMovil() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [ search, setSearch ] = useState('')
  // Este hook es el encargado de conectarse con el servidor para
  // realizar la busqueda
  const [ items, hasMore, isLoading, onLoadMore ] = useSearchUsers({
    search,
    fetchDelay: 500
  }) 
  // Es hook se encarga de manejar los datos 
  // de la actividad reciente
  const [ dataRecient, addNew ] = useRecientSearch()


  const handleClick = (item) => {
    const newItem = {
        ...item,
        id: item._id
    }
    delete newItem._id
    addNew('users', newItem)
  }



  return (
    <>
      <BtnShowSeeker onOpen={onOpen}/>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        scrollBehavior='inside'
        placement="center"
        className="sm:hidden"
        backdrop='blur'
        classNames={{
          wrapper: '',
          closeButton: '',
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
              </ModalHeader>
              <ModalBody className="p-10">
                <CustomInputSearch 
                  setSearch={setSearch}
                  search={search}
                />
                {
                  isLoading
                      ? <Loader className='flex justify-center'/>
                      :
                        <div>
                          {
                            search 
                              ? 
                                items?.map(item => (
                                  <UserItem 
                                    key={item._id} 
                                    item={item}
                                    handleClick={handleClick}
                                    className='mb-2 hover:bg-default-200 p-2 rounded-md transition'
                                  />
                                ))
                              : 
                                <RecientSearch dataRecient={dataRecient}/>
                          }
                        </div>
                }
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    
    </>
  )
}