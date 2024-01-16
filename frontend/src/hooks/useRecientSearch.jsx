import { useEffect, useState } from 'react'
import { add, getAll } from '../config/indexDB'

export default function useRecientSearch() {
  const [ searches, setSearches ] = useState([])
  const [ users, setUsers ] = useState([])
  const [ count, setCount ] = useState(0) 

  useEffect(() => {
    setSearches(getAll('searches'))
  }, [count])

  useEffect(() => {
    setUsers(getAll('users'))
  }, [count])


  const refresh = () => {
    setCount(count + 1)
  }

  const addNew = (store, item) => {
    add(store, item)
    refresh()
  }

  return [searches, users, addNew]
}