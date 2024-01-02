import { useRef, useState } from "react";
import SearchIcon from "./SearchIcon";
import { 
  Autocomplete, 
  AutocompleteItem, 
  Avatar, 
  Button 
} from "@nextui-org/react";
import { BASE_URL } from "../../../utils/constants";
import useSearchUsers from "../../../hooks/useSearchUsers";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";

export default function SearchForm() {
  const autcompleteRef = useRef(null)
  const [ search, setSearch ] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [items, hasMore, isLoading, onLoadMore] = useSearchUsers({
    search, 
    fetchDelay: 500, 
  })

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  const handleChange = ( text ) => {
    setSearch(text)
  }

  return (
    <Autocomplete
      // selectorIcon={null}
      // selectorButtonProps={
      //   {
      //     className: "hidden"
      //   }
      // }
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
      }}
      defaultItems={items ? items : []}
      inputProps={{
        classNames: {
          input: "ml-1 text-md text-background-light",
          inputWrapper: "h-[48px] py-[0.2rem] border-0 h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
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
          base: "rounded-large",
          content: "p-1 border-small border-default-100 bg-background",
        },
      }}
      startContent={
        <SearchIcon className="text-default-600 w-6 h-6" strokeWidth={2.5} size={20} />
      }
      variant="bordered"
      radius="lg"
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.name} href={'/' + item.username}>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar && `${BASE_URL}/${item.avatar}`} />
              <div className="flex flex-col max-w-[100px]">
                <span className="text-small truncate ">{item.name}</span>
                <span className="text-tiny text-default-400">{item.username}</span>
              </div>
            </div>
            <Button
              className="border-small mr-0.5 font-medium shadow-small"
              radius="full"
              size="sm"
              variant="bordered"
            >
              Add
            </Button>
          </div>
        </AutocompleteItem>
        )
      }
    </Autocomplete>

    
  )
  
}