import { useQuery } from "@apollo/client"
import { GET_USER } from "../../../gql/user"
import Loader from '../../Loader'
import AvatarImage from '../../../assets/img/064 avatar.png'
import UserNotFound from "../UserNotFound"
import AvatarModal from "../Modals/Avatar/BasicModal"
import useAuth from '../../../hooks/useAuth'
import { BASE_URL } from "../../../utils/constants"
import EditProfile from "../Modals/EditProfile/EditProfile"
import { Image } from "@nextui-org/react"
import BtnsFollowersAndFollowing from './BtnsFollowersAndFollowing'
import BtnFollow from './BtnFollow'

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

  const date = new Date(Number(data.getUser.createAt));

  return (
    <div className="flex w-full max-w-5xl flex-col sm:flex-row">
      <div className="w-full sm:w-2/6 flex justify-center flex-col items-center">
        <div className="p-2 flex flex-col items-center">
          <div className="mt-10 relative max-w-max self-start">
            <Image 
              className="rounded-full w-48 h-48 object-cover min-w-[12rem]-"
              src={
                !data.getUser.avatar 
                  ? AvatarImage 
                  : BASE_URL + '/' + data.getUser.avatar
              } 
              alt="NextUI hero Image with delay"
            />
            {
              username == auth.username
                && <AvatarModal auth={auth}/>
            }
          </div>
          
          <div className="pt-7">
            <h1 className="font-bold text-2xl">{data.getUser.name}</h1>
            <p className="text-font-gray">@{data.getUser.username}</p>
            <p className="text-font-gray mt-5">Se unio en {date.toLocaleString('es-ES', { year: 'numeric', month: 'long'})}</p>
          </div>

          <div className="self-start">
            <BtnsFollowersAndFollowing username={username}/>
          </div>

          <div id="other" className="self-start flex flex-col gap-y-2">
            <div className="">
              {
                data.getUser.webSite
                  && <a 
                      href={data.getUser.webSite} 
                      rel="noreferrer" 
                      target="_blank"
                      className="text-font-gray hover:text-primary-400 transition-colors duration-100"
                    >
                        {data.getUser.webSite}
                    </a>
              }
            </div>
            <div>
              {
                data.getUser.description
                  && <p className="text-font-gray">{data.getUser.description}</p>
              }
            </div>
          </div>

          <div className="self-start my-8 w-full">
            {
              username == auth.username
                && <EditProfile userData={data.getUser}/>
            }
          </div>

        </div>
      </div>

      <div className="w-full flex flex-col">
        <div id="header-profile">

        </div>
        <div id="follow" className="self-end">
          <BtnFollow username={username}/>
        </div>
      </div>

    </div>
    
  )
}