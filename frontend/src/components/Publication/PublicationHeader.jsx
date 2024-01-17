import { Link } from "react-router-dom"
import { Avatar } from "@nextui-org/react"
import { BASE_URL } from "../../utils/constants"

export default function PublicationHeader({ id, user, since, MenuPublication, auth }) {
  return (
    <div className="flex justify-between">
      <Link to={'/' + user.username}>
        <div className="flex gap-5">
          <Avatar 
            isBordered 
            radius="full" 
            size="md" 
            src={BASE_URL + '/' + user.avatar} 
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600 space-x-2">
              <span>{user.name}</span>
              <span className='text-default-400 text-small font-semibold leading-none'>
                {since}
              </span>
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{user.username}
            </h5>
          </div>
        </div>
      </Link>
      {
        (MenuPublication && auth.username === user.username ) &&
          <MenuPublication idPublication={id}/>
      }
    </div>
  )
}