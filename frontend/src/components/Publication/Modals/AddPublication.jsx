import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button,
} from "@nextui-org/react";
import BtnAddFiles from "./BtnAddFiles";
import { useState } from "react";
import AddPublicationForm from "./AddPublicationForm";

export default function AddPublication({ isOpen, onOpenChange }) {
  const [ images, setImages ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  
  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        scrollBehavior='inside'
        placement="center"
        
        >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Nueva Publicación</ModalHeader>
              <ModalBody className="p-8">
                <AddPublicationForm 
                  images={images} 
                  onClose={onClose} 
                  setIsLoading={setIsLoading}
                />
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <BtnAddFiles setImages={setImages}/>
                <div className="flex gap-x-2">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button 
                    color="primary" 
                    type="submit" 
                    form="add-publication"
                    isLoading={isLoading}
                  >
                    Crear
                  </Button>

                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}