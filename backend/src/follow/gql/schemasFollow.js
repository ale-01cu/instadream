const typeDefs = `
  type FollowersAndFollowingNumber {
    followers: Int
    following: Int
  }

  type Query {
    followers(username: String!): [User]
    following(username: String): [User]
    followersNumber(username: String!): Int
    followingNumber(username: String!): Int
    followersAndFollowingNumber(username: String!): FollowersAndFollowingNumber
  }

  type Mutation {
    follow(username: String!): Boolean
    unFollow(username: String!): Boolean
    isFollow(username: String!): Boolean

  } 

`

export default typeDefs
