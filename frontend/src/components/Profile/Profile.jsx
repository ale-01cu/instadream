import { useQuery } from "@apollo/client"
import { GET_USER } from "../../gql/user"
import Loader from '../Loader'
import AvatarImage from '../../assets/img/064 avatar.png'
import UserNotFound from "../UserNotFound"
import AvatarModal from "../Modals/Avatar/BasicModal"
import useAuth from '../../hooks/useAuth'

export default function Profile({ username }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username }
  })
  const {auth} = useAuth()

  // Pantalla de carga
  if(loading) return (
    <div className="fixed">
      <Loader/>
    </div>
  )

  // Usuario no encontrado...
  if(error) return (
    <UserNotFound/>
  )

  return (
    <div className="flex w-full max-w-5xl">
      <div className="w-2/6 flex justify-center">
        <div className="mt-10 relative">
          <img 
            className="rounded-full w-48 h-48"
            src={!data.getUser.avatar ? AvatarImage : data.getUser.avatar} 
            alt="User Image" 
          />
          {
            username == auth.username
              && <AvatarModal/>
          }
        </div>
      </div>

      <div className="w-6/6">
        <div id="header-profile">

        </div>
        <div id="followers">

        </div>
        <div id="other">
          <p>{data.getUser.name}</p>
          {
            data.getUser.webSite
              && <a href={data.getUser.webSite} rel="noreferrer" target="_blank">{data.getUser.webSite}</a>
          }
          {
            data.getUser.description
              && <p>{data.getUser.description}</p>
          }
        </div>
      </div>

    </div>
    
  )
}