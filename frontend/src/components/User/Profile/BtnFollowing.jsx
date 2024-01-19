import {Link, useDisclosure} from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWING_NUMBER } from "../../../gql/follow";
import FollowingModal from "../Modals/ListFollowingAndFollowersUsers";
import { GET_FOLLOWING } from "../../../gql/follow";

export default function BtnsFollowing ({ username }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { data, loading, error } = useQuery(GET_FOLLOWING_NUMBER, {
    variables: { username },
    fetchPolicy: 'network-only'
  })

  if(error) return null
  if(loading) return null

  return (
    <div className="flex gap-x-1">
      <span className="font-semibold">
        {data.followingNumber}
      </span>
      <Link 
        onPress={onOpen} 
        underline="hover" 
        className="text-font-gray cursor-pointer"
      >
        Siguiendo
      </Link>
      <FollowingModal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        username={username}
        queryGQL={GET_FOLLOWING}
        queryName='following'
        headerText='Siguiendo'
      />
    </div>
  )
}