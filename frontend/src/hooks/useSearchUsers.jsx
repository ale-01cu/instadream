import { useLazyQuery } from "@apollo/client";
import { SEARCH_USERS } from "../gql/user";
import { useEffect, useRef, useState } from "react";

export default function useSearchUsers({search = '', fetchDelay = 1500}) {
  const [searchUsers] = useLazyQuery(SEARCH_USERS);
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [offset, setOffset] = useState(0);
  const limit = 6;
  let isOnLoadMore = useRef(false)

  const addItems = (newItems) => {
    setItems(prevArray => [
      ...prevArray,
      ...newItems.filter(
        nuevo => !prevArray.some(prev => prev.id === nuevo.id))
    ]);
  };

  useEffect(() => {
    setIsLoading(true)
    const getData = setTimeout(async () => {
      try {

        const {data, error } = await searchUsers({
          variables: { inputSearch: { 
            search,
            offset,
            limit
          }},
        })

        if (error) {
          throw new Error(error);
        }



        if(isOnLoadMore.current) addItems(data.searchUsers.data)
        else setItems(data.searchUsers.data)
        setHasMore(data.searchUsers.next !== null)

      } catch (error) {
          console.error("There was an error with the fetch operation:", error);
        
      } finally {
          setIsLoading(false)
          isOnLoadMore.current = false

      } 

    }, fetchDelay)
    return () => clearTimeout(getData)
  }, [search, searchUsers, fetchDelay, offset])


  const onLoadMore = async () => {
    isOnLoadMore.current = true
    setOffset(offset+limit)
  }

  
  return [items, hasMore, isLoading, onLoadMore]
}