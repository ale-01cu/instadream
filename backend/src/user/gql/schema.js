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
    location: String
    birthDate: String
    createAt: String
  }

  type SearchUsers {
    count: Int
    previous: Int
    next: Int
    data: [User]
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

  input UserUpdateInput {
    name: String
    username: String
    webSite: String
    description: String
    location: String
    birthDate: String
  }

  input InputSearch {
    search: String
    offset: Int
    limit: Int
  }

  type Token {
    token: String
    
  }

  type Query {
    getUser(username: String!): User
    searchUsers(input: InputSearch): SearchUsers

  }

  type tokenVerify {
    isValid: Boolean
  }


  type Mutation {
    register(user: UserInput): User
    login(user: LoginInput): Token
    verifyToken(token: String!): Boolean
    deleteAvatar: Boolean
    updateUser(input: UserUpdateInput): User
  }

`

export default typeDefs
