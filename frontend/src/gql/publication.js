import { gql } from '@apollo/client'

export const LIST_ALL_PUBLICATIONS = gql`
  query listAllPublication {
    listAllPublication {
      id
      description
      user {
        id
        name
        username
        avatar
      
      }
      content {
        id
        path
      }
      createAt
    
    }

  }

`