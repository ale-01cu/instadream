import {
  Modal, 
  ModalContent,
  ModalHeader, 
  ModalBody, 
  Button, 
  useDisclosure,
  Avatar
} from "@nextui-org/react";
import BtnShowSearcher from "./BtnShowSearcher";
import CustomInputSearch from "./CustomInputSearch";
import useSearchUsers from "../../../hooks/useSearchUsers";
import { useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { Link } from "react-router-dom";
import Loader from '../../Loader'
import useRecientSearch from "../../../hooks/useRecientSearch";

export default function SearchModalMovil() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [ search, setSearch ] = useState('')
  const [ items, hasMore, isLoading, onLoadMore ] = useSearchUsers({
    search,
    fetchDelay: 500
  }) 

  // const [ dataRecient, addNew ] = useRecientSearch()
  // console.log(dataRecient);

  const handleChange = (e) => {
    const text = e.target.value
    setSearch(text)
  }

  return (
    <>
      <BtnShowSearcher onOpen={onOpen}/>
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
                <CustomInputSearch handleChange={handleChange}/>
                <div>
                  {
                    isLoading
                      ? <Loader className='flex justify-center'/>
                      :
                        search 
                          ? 
                            items?.map(item => (
                              <div key={item._id} className="mb-3 hover:bg-default-200 p-2 rounded-md transition">
                                <Link to={'/' + item.username}>
                                  <div className="flex gap-2 items-center">
                                    <Avatar 
                                      alt={item.name} 
                                      className="flex-shrink-0" 
                                      size="sm" 
                                      src={item.avatar && `${BASE_URL}/${item.avatar}`} 
                                    />
                                    <div className="flex flex-col">
                                      <span className="text-small truncate ">{item.name}</span>
                                      <span className="text-tiny text-default-400">@{item.username}</span>
                                    </div>
                                  </div>
                                </Link>

                              </div>
                            ))
                            : 
                              <div>
                                <h1>Actividad Reciente</h1>
                                {/* <ul>
                                  {
                                    dataRecient.searches.map(s => (
                                      <li key={s.id}>
                                        <Link to={'/' + item.username}>
                                          <div className="flex gap-2 items-center">
                                            <Avatar 
                                              alt={item.name} 
                                              className="flex-shrink-0" 
                                              size="sm" 
                                              src={item.avatar && `${BASE_URL}/${item.avatar}`} 
                                            />
                                            <div className="flex flex-col">
                                              <span className="text-small truncate ">{item.name}</span>
                                              <span className="text-tiny text-default-400">@{item.username}</span>
                                            </div>
                                          </div>
                                        </Link>
                                      </li>
                                    ))
                                  }
                                </ul> */}
                                {/* <ul>
                                  {
                                    dataRecient.searches.map(item => (
                                      <li key={item.id}>
                                        <Link to={'/' + item.username}>
                                          <div className="flex gap-2 items-center">
                                            <Avatar 
                                              alt={item.name} 
                                              className="flex-shrink-0" 
                                              size="sm" 
                                              src={item.avatar && `${BASE_URL}/${item.avatar}`} 
                                            />
                                            <div className="flex flex-col">
                                              <span className="text-small truncate ">{item.name}</span>
                                              <span className="text-tiny text-default-400">@{item.username}</span>
                                            </div>
                                          </div>
                                        </Link>
                                      </li>
                                    ))
                                  }
                                </ul> */}
                              </div>
                            
                  }
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    
    </>
  )
}