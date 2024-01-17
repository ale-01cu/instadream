import AvatarImage from '../../../assets/img/064 avatar.png'
import AvatarModal from "../Modals/Avatar/BasicModal"
import { BASE_URL } from "../../../utils/constants"
import EditProfile from "../Modals/EditProfile/EditProfile"
import { Image } from "@nextui-org/react"
import BtnsFollowersAndFollowing from './BtnsFollowersAndFollowing'
import useAuth from '../../../hooks/useAuth'
import BtnFollow from './BtnFollow'

export default function ProfileLeftSide({ username, data }) {
  const {auth} = useAuth()
  const date = new Date(Number(data.getUser.createAt));

  return (
    <div className="w-full sm:w-2/6 flex flex-col items-center">
      <div className="w-[14.5rem] p-2 flex flex-col items-start">
        <div className="mt-10 relative max-w-max">
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
          <p className="text-font-gray mt-5">
            Se unio en {
              date.toLocaleString('es-ES', { 
                year: 'numeric', month: 'long'})
            }
          </p>
        </div>

        <div className="">
          <BtnsFollowersAndFollowing 
            username={username}
          />
        </div>

        <div id="other" className="flex flex-col gap-y-2">
          <div className="">
            {
              data.getUser.webSite && 
                <a 
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
              data.getUser.description && 
                <p className="text-font-gray">
                  {data.getUser.description}
                </p>
            }
          </div>
        </div>
        
        {
          username == auth.username && 
            <div className="my-8 w-full">
              <EditProfile 
                userData={data.getUser}
              />
            </div>
        }
        
        <div id="follow" className="py-5">
          <BtnFollow username={username}/>
        </div>

      </div>
    </div>
  )
}