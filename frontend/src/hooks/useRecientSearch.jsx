import { useEffect, useState } from 'react'
import { add, getAll } from '../config/indexDB'

// Para manejar las busquedas recientes
export default function useRecientSearch() {
  const [ dataRecient, setDataRecient ] = useState({
    searches: [],
    users: []
  })
  const [ count, setCount ] = useState(0) 

  useEffect(() => {
    getAll('searches')
      .then(searches => setDataRecient({
        ...dataRecient,
        searches
      }))
      .catch(err => console.error(err))
  }, [count])

  useEffect(() => {
    getAll('users')
      .then(users => setDataRecient({
        ...dataRecient,
        users
      }))
      .catch(err => console.error(err))
  }, [count])


  const refresh = () => {
    setCount(count + 1)
  }

  const addNew = (store, item) => {
    add(store, item)
    refresh()
  }

  return [dataRecient, addNew]
}