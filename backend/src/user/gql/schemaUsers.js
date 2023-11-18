const typeDefs = `#graphql
  type User {
    id: ID
    name: String
    username: String
    email: String
    webSite: String
    description: String
    password: String
    avatar: String
    createAt: String
  }

  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Token {
    token: String
    
  }

  type Query {
    getUser: User
  }

  type Mutation {
    register(user: UserInput): User
    login(user: LoginInput): Token
  }

`

export default typeDefs