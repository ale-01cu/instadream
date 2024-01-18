import UserItem from './UserItem'

// Lista los ultimos usuarios presionados en el buscador
// y las ultimas busquedas realizadas
export default function RecientSearch({ dataRecient }) {
  return (
    <div>
      <h1 className="p-5 text-xl">
         Actividad Reciente
      </h1> 
      <ul>
         {
            dataRecient?.searches?.map(s => (
            <li key={s.id}>
               <p>{s}</p>
            </li>
            ))
         }
      </ul> 
      
      <ul>
         {
            dataRecient?.users?.map(item => (
            <li key={item.id}>
              <UserItem 
               item={item}
               className='mb-2 hover:bg-default-200 p-2 rounded-md transition'
            />
            </li>
            ))
         }
      </ul>
    </div>
  )
}