import createFollow from '../controllers/createFollow.js'
import isFollow from '../controllers/isFollow.js'
import getFollowers, { getFollowersNumber } from '../controllers/getFollwers.js'
import getFollowing, { getFollowingNumber } from '../controllers/getFollowing.js'
import unFollow from '../controllers/unFollow.js'
import getFollowingAndFollowersNumber from '../controllers/getFollowingAndFollowersNumber.js'

const resolvers = {
  Query: {
    isFollow: (_, args, context) => isFollow(args, context),
    followers: (_, args, context) => getFollowers(args, context),
    following: (_, args, context) => getFollowing(args, context),
    followersNumber: (_, args, context) => getFollowersNumber(args, context),
    followingNumber: (_, args, context) => getFollowingNumber(args, context),
    followersAndFollowingNumber: (_, args, context) => getFollowingAndFollowersNumber(args, context)

  },
  Mutation: {
    follow: (_, args, context) => createFollow(args, context),
    unFollow: (_, args, context) => unFollow(args, context)
  }
}

export default resolvers
