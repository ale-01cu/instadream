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

type Query {
  listAllPublication: [Publication]
  listPublication: [Publication]
}

type Mutation {
  deletePublication(id: ID): Boolean

}

`

export default typeDefs
