import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation register($user: UserInput) {
    register(user: $user) {
      id
      name
      username
      email
      createAt
        
    }
  }
`

export const LOGIN = gql`
  mutation login($user: LoginInput) {
    login(user: $user) {
      token
    }
  }

`