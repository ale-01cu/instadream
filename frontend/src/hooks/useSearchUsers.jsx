import { useEffect, useState } from "react";
import searchUsers from "../services/searchUsers";
import { useCallback } from "react";

export default function useSearchUsers({search = '', fetchDelay = 1500}) {
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [lastId, setLastId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const addItems = useCallback((newItems) => {
    setItems(prevArray => [
      ...prevArray,
      ...newItems.filter(
        nuevo => !prevArray.some(prev => prev.id === nuevo.id))
    ]);
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const getData = setTimeout(async () => {

      const data = await searchUsers(search)
      setItems(data?.data)
      setHasMore(data?.next ? true : false)
      setLastId(data?.data[data?.data?.length - 1]?._id)

      setIsLoading(false)

    }, fetchDelay)
    return () => clearTimeout(getData)
  }, [search, fetchDelay])


  const onLoadMore = async () => {
      const data = await searchUsers(search, lastId)
      addItems(data?.data)
      setHasMore(data?.next ? true : false)
      setLastId(data?.data[data?.data?.length - 1]?.id)
  }

  
  return [items, hasMore, isLoading, onLoadMore]
}