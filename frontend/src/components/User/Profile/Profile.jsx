import { useQuery } from "@apollo/client"
import { GET_USER } from "../../../gql/user"
import Loader from '../../Loader'
import UserNotFound from "../UserNotFound"
import ListPublication from "../../Publication/ListPublication"
import { LIST_PUBLICATION } from "../../../gql/publication"
import PublicationMenu from "../../Publication/PublicationMenu"
import ProfileLeftSide from "./ProfileLeftSide"

export default function Profile({ username }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username }
  })

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
    <div className="flex w-full max-w-5xl flex-col md:flex-row lg:px-8 items-center md:items-start">
      <ProfileLeftSide 
        username={username} 
        data={data}
      />

      <div className="w-full flex flex-col-reverse self-start">
        <div className="" id="publications-profile">
          <ListPublication 
            queryGQLName='listPublication' 
            queryGQL={LIST_PUBLICATION}
            username={username}
            PublicationMenu={PublicationMenu}
          />
        </div>
      </div>

    </div>
    
  )
}