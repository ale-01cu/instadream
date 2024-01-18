import { Link } from "react-router-dom"
import { Avatar } from "@nextui-org/react"
import { BASE_URL } from "../../../utils/constants"

// Item que muestra la info del ususario
export default function UserItem({ item, handleClick, className }) {
  return (
    <div 
      className={className}
      onClick={handleClick}
    >
      <Link to={'/' + item.username}>
        <div className="flex gap-2 items-center">
          <Avatar 
            alt={item.name} 
            className="flex-shrink-0" 
            size="sm" 
            src={item.avatar && `${BASE_URL}/${item.avatar}`} 
          />
          <div className="flex flex-col">
            <span className="text-small truncate ">
              {item.name}
            </span>
            <span className="text-tiny text-default-400">
              @{item.username}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}