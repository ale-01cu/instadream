import createFollow from '../controllers/createFollow.js'
import isFollow from '../controllers/isFollow.js'
import getFollowers from '../controllers/getFollwers.js'
import getFollowing from '../controllers/getFollowing.js'
import unFollow from '../controllers/unFollow.js'

const resolvers = {
  Mutation: {
    follow: (_, args, context) => createFollow(args, context),
    unFollow: (_, args, context) => unFollow(args, context),
    isFollow: (_, args, context) => isFollow(args, context),
    followers: (_, args, context) => getFollowers(args, context),
    following: (_, args, context) => getFollowing(args, context)
  }
}

export default resolvers
