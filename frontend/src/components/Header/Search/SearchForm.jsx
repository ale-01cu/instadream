import { useRef, useState } from "react";
import SearchIcon from "./SearchIcon";
import { 
  Autocomplete, 
  AutocompleteItem, 
  Avatar, 
  AutocompleteSection,
} from "@nextui-org/react";
import { BASE_URL } from "../../../utils/constants";
import useSearchUsers from "../../../hooks/useSearchUsers";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import Loader from '../../Loader'
import { Link } from 'react-router-dom'
import useRecientSearch from "../../../hooks/useRecientSearch";
import UserItem from "./UserItem";

// Buscador para la vista de pantallas grandes
export default function SearchForm({ className }) {
  const autcompleteRef = useRef(null)
  const [ search, setSearch ] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  // Este hook es el encargado de conectarse con el servidor para
  // realizar la busqueda
  const [items, hasMore, isLoading, onLoadMore] = useSearchUsers({
    search, 
    fetchDelay: 500, 
  })

  // Hook de nextUI para realizar la paginacion por infinite Scroll
  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  // Es hook se encarga de manejar los datos 
  // de la actividad reciente
  const [ dataRecient, addNew ] = useRecientSearch()

  const handleChange = ( text ) => {
    setSearch(text)
  }

  const handleClick = (item) => {
    const newItem = {
      ...item,
      id: item._id
    }
    delete newItem._id
    addNew('users', newItem)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('aaaaaaaaaaa');
    console.log(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete
        className={className}
        id="autocomplete"
        selectorIcon={null}
        selectorButtonProps={{ className: "hidden" }}
        isLoading={isLoading}
        ref={autcompleteRef}
        onInputChange={handleChange}
        inputValue={search}
        allowsCustomValue
        scrollRef={scrollerRef}
        onOpenChange={setIsOpen}
        onClose={() => autcompleteRef.current.blur()}
        classNames={{
          base: "max-w-full sm:max-w-[15rem] rounded-3xl min-w-[210px]",
          mainWrapper: "h-full",
          listbox: 'bg-primary-800'
        }}
        defaultItems={items ? items : []}
        inputProps={{
          classNames: {
            input: "ml-1 text-md text-background-light",
            inputWrapper: `
              h-[48px] py-[0.2rem] border-0
              h-full font-normal text-default-500 
              bg-default-400/20 dark:bg-default-500/20`,
          },
        }}
        
        listboxProps={{
          hideSelectedIcon: true,
          itemClasses: {
            base: [
              "rounded-medium",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "dark:data-[hover=true]:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[hover=true]:bg-default-200",
              "data-[selectable=true]:focus:bg-default-100",
              "data-[focus-visible=true]:ring-default-500",
            ],
          },
        }}
        aria-label="Buscar"
        placeholder="Buscar..."
        popoverProps={{
          offset: 10,
          classNames: {
            base: "rounded-large fixed",
            content: "p-1 border-small border-default-100 bg-background",
          },
        }}
        startContent={
          <SearchIcon 
            className="text-default-600 w-6 h-6" 
            strokeWidth={2.5} 
            size={20} 
          />
        }
        variant="bordered"
        radius="lg"
      >
        {
          isLoading &&
            <AutocompleteSection>
              <AutocompleteItem key='spinner' textValue="loading">
                  <Loader 
                    className='flex justify-center' 
                    color='warning'
                  />
              </AutocompleteItem>
            </AutocompleteSection>

        }
        {
          !search 
            ?
              <AutocompleteSection title={'Actividad Reciente'} classNames={{
                heading: 'text-xl text-white'
              }}>
                {
                  dataRecient.searches.map(s => (
                    <AutocompleteItem key={s.id}>
                      search {s.id}
                    </AutocompleteItem>
                  ))
                }
                {
                  dataRecient.users.map(u => (
                    <AutocompleteItem 
                      key={u.id} 
                      textValue={u.name} 
                    >
                      <UserItem item={u}/>
                    </AutocompleteItem>
                  ))
                }
              </AutocompleteSection>
            :
              <AutocompleteSection>
                {
                  items?.map(item => (
                    <AutocompleteItem 
                      key={item._id} 
                      textValue={item.name} 
                      onClick={() => handleClick(item)}
                    >
                      <UserItem 
                        item={item}
                      />
                    </AutocompleteItem>
                  ))
                }
              </AutocompleteSection>
        }
      </Autocomplete>

    </form>
    
  )
  
}