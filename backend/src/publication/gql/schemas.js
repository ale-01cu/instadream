const typeDefs = `#graphql
  type Publication {
    id: ID
    user: User
    description: String
    status: Boolean
    createAt: String
  }

`

export default typeDefs
