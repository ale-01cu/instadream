import { gql } from '@apollo/client'

export const LIST_ALL_PUBLICATIONS = gql`
  query listAllPublication($lastCreateAt: String) {
    listAllPublication(lastCreateAt: $lastCreateAt) {
      next
      data {
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

  }

`

export const LIST_PUBLICATION = gql`
query listPublication($lastCreateAt: String, $username: String!) {
  listPublication(lastCreateAt: $lastCreateAt, username: $username) {
    next
    data {
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
}

`

export const DELETE_PUBLICATION = gql`
mutation deletePublication($id: ID) {
  deletePublication(id: $id)
}
`