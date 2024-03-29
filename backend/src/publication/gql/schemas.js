const typeDefs = `#graphql

type PublicationContent {
  id: ID
  path: String
}

type Publication {
  id: ID
  user: User
  content: [PublicationContent]
  description: String
  status: Boolean
  createAt: String
}

type ListPublication {
  next: Boolean
  data: [Publication]
}

type Query {
  listAllPublication(lastCreateAt: String): ListPublication
  listPublication(lastCreateAt: String, username: String!): ListPublication
}

type Mutation {
  deletePublication(id: ID): Boolean

}

`

export default typeDefs
