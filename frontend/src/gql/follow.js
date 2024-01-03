import { gql } from '@apollo/client'

export const GET_FOLLOWERS_NUMBER = gql`
  query followersNumber($username: String!){
    followersNumber(username: $username)
  }

`
export const GET_FOLLOWING_NUMBER = gql`
  query followingNumber($username: String!){
    followingNumber(username: $username)
  }

`

export const IS_FOLLOW = gql`
  query isFollow($username: String!){
    isFollow(username: $username)
  }

`

export const FOLLOW = gql`
  mutation follow($username: String!){
    follow(username: $username)
  }
`

export const UN_FOLLOW = gql`
  mutation unFollow($username: String!) {
    unFollow(username: $username)
  }
`

export const GET_FOLLOWERS = gql`
  query followers($username: String!){
    followers(username: $username) {
      id
      username
      name
      email
    }
  }
`

export const GET_FOLLOWING = gql`
  query following($username: String!){
    following(username: $username) {
      id
      username
      name
      avatar
    }
  }
`