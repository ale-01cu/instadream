import {Link, useDisclosure} from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS_NUMBER } from "../../../gql/follow";
import FollowersModal from '../Modals/FollowersUsers/FollowersModal'

export default function BtnsFollowers ({ username }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { data, loading, error } = useQuery(GET_FOLLOWERS_NUMBER, {
    variables: { username }
  })

  if(error) return null
  if(loading) return null

  return (
    <div className="flex gap-x-1">
      <span className="font-semibold">{data.followersNumber}</span>
      <Link
         onPress={onOpen} 
        underline="hover" 
        className="text-font-gray cursor-pointer"
        >
          Seguidores
        </Link>
      <FollowersModal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        username={username}
      />
    </div>
  )
}