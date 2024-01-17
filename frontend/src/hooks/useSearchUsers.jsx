import { useEffect, useState } from "react";
import { getToken } from '../utils/token'

export default function useSearchUsers({search = '', fetchDelay = 1500}) {
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [lastId, setLastId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
        const url = `http://localhost:4000/user/search?s=${search}&lastId=`
        const res = await fetch(url, {
          headers: {
            Authorization: getToken()
          }
        })
        const data = await res.json()

        setItems(data?.data)
        setHasMore(data?.next ? true : false)
        setLastId(data?.data[data?.data?.length - 1]?._id)

      } catch (error) {
          console.error("There was an error with the fetch operation:", error);
        
      } finally {
          setIsLoading(false)
      } 

    }, fetchDelay)
    return () => clearTimeout(getData)
  }, [search, fetchDelay])


  const onLoadMore = async () => {
    try {
      const url = `http://localhost:4000/user/search?s=${search}&lastId=${lastId}`
      const res = await fetch(url, {
        headers: { Authorization: getToken() }
      })
      const data = await res.json()

      addItems(data?.data)
      setHasMore(data?.next ? true : false)
      setLastId(data?.data[data?.data?.length - 1].id)
    } catch (error) {
      console.log(error);
    }
  }

  
  return [items, hasMore, isLoading, onLoadMore]
}