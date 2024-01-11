import { gql } from '@apollo/client'

export const LIST_ALL_PUBLICATIONS = gql`
  query listAllPublication($lastId: ID) {
    listAllPublication(lastId: $lastId) {
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
query listPublication($lastId: ID, $username: String!) {
  listPublication(lastId: $lastId, username: $username) {
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