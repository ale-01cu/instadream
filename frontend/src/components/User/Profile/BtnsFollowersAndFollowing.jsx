import BtnsFollowers from "./BtnFollowers";
import BtnsFollowing from "./BtnFollowing";

export default function BtnsFollowersAndFollowing ({ username }) {
  return (
    <div className="flex justify-between gap-x-5 py-2 pb-8">
      <BtnsFollowing username={username}/>
      <BtnsFollowers username={username}/>
    </div>
  )
}