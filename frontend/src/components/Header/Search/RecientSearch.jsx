import useRecientSearch from '../../../hooks/useRecientSearch'
import { Avatar } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../utils/constants'

export default function RecientSearch({ dataRecient }) {
  return (
    <div>
      <h1 className="p-5 text-xl">Actividad Reciente</h1> 
      <ul>
         {
            dataRecient.searches.map(s => (
            <li key={s.id}>
               <p> {s} </p>
            </li>
            ))
         }
      </ul> 
      
      <ul>
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
      </ul>
    </div>
  )
}