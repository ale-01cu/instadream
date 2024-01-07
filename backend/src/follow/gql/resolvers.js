import createFollow from '../controllers/createFollow.js'
import isFollow from '../controllers/isFollow.js'
import getFollowers from '../controllers/getFollwers.js'
import getFollowing from '../controllers/getFollowing.js'
import getFollowingNumber from '../controllers/getFollowingNumber.js'
import getFollowersNumber from '../controllers/getFollowersNumber.js'
import unFollow from '../controllers/unFollow.js'
import getFollowingAndFollowersNumber from '../controllers/getFollowingAndFollowersNumber.js'
import middlewareControllerGlobal from '../../user/middlewares/middlewareControllerGlobal.js'
import authorizationMiddlewareGQL from '../../user/middlewares/authorizationGQL.js'

const resolvers = middlewareControllerGlobal({
  Query: {
    isFollow,
    followers: getFollowers,
    following: getFollowing,
    followersNumber: getFollowersNumber,
    followingNumber: getFollowingNumber,
    followersAndFollowingNumber: getFollowingAndFollowersNumber

  },
  Mutation: {
    follow: createFollow,
    unFollow
  }
}, [authorizationMiddlewareGQL])

export default resolvers
