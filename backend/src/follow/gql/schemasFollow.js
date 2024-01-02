const typeDefs = `
  type Mutation {
    follow(username: String!): Boolean
    unFollow(username: String!): Boolean
    isFollow(username: String!): Boolean
    followers(username: String!): [User]
    following(username: String): [User]
  } 

`

export default typeDefs
