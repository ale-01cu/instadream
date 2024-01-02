import { gql } from '@apollo/client'

export const FOLLOWERS_AND_FOLLOWING_NUMBER = gql`
  query followersAndFollowingNumber($username: String!){
    followersAndFollowingNumber(username: $username) {
      followers
      following
    }
  }

`