import {Link} from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import { FOLLOWERS_AND_FOLLOWING_NUMBER } from "../../../gql/follow";

export default function BtnsFollowersAndFollowing ({ username }) {
  const { data, loading, error } = useQuery(FOLLOWERS_AND_FOLLOWING_NUMBER, {
    variables: { username }
  })

  if(error) return null
  if(loading) return null

  return (
    <div className="flex justify-between gap-x-5 py-2 pb-8">
      <div className="flex gap-x-1">
        <span className="font-semibold">{data.followersAndFollowingNumber.following}</span>
        <Link href="#" underline="hover" className="text-font-gray">Following</Link>
      </div>
      <div className="flex gap-x-1">
        <span className="font-semibold">{data.followersAndFollowingNumber.followers}</span>
        <Link href="#" underline="hover" className="text-font-gray">Followers</Link>
      </div>
    </div>
  )
}