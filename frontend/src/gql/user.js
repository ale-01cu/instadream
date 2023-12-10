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


export const GET_USER = gql`
  query getUser($username: String){
    getUser(username: $username){
        id
        name
        username
        email
        avatar
        webSite
        description
        createAt
    }
  }

`

export const UPDATE_AVATAR = gql`
  mutation updateAvatar($file: Upload) {
    updateAvatar(file: $file) {
      status
      urlAvatar
    }
  }

`

export const VERIFY_TOKEN = gql`
  mutation verifyToken($token: TokenInput) {
    verifyToken(token: $token) {
        isValid
    }
  }


`