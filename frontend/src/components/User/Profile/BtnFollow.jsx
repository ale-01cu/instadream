import { Button } from "@nextui-org/react"
import { useQuery, useMutation, useApolloClient } from "@apollo/client"
import { FOLLOW, IS_FOLLOW, UN_FOLLOW } from "../../../gql/follow"
import useAuth from "../../../hooks/useAuth"
import { useState } from "react"
import Spinner from '../../Loader'
import { GET_FOLLOWERS_NUMBER } from "../../../gql/follow"

export default function BtnFollow ({ username /* info del usuario que se esata observando */ }) {
  // Info del usuario que esta logueado
  const { auth } = useAuth()
  const [ follow ] = useMutation(FOLLOW)
  const [ unFollow ] = useMutation(UN_FOLLOW)
  const client = useApolloClient()

  const { data, loading, error } = useQuery(IS_FOLLOW, {
    variables: { username }
  })
  const [ isLoading, setIsLoading ] = useState(false)

  if(auth.username === username) return null
  if(loading) return <Spinner/>
  if(error) return null

  const { isFollow } = data

  const handleFollow = async () => {
    try {
      setIsLoading(true)
      const { data } = await follow({
        variables: { username }
      })
  
      client.writeQuery({
        query: IS_FOLLOW,
        data: { isFollow: data.follow },
        variables: { username },
      })

      const { followersNumber } = client.readQuery({
        query: GET_FOLLOWERS_NUMBER,
        variables: { username }
      });

      client.writeQuery({
        query: GET_FOLLOWERS_NUMBER,
        data: { followersNumber: followersNumber + 1},
        variables: { username },
      });
        
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }

  }

  const handleUnFollow = async () => {
    try {
      setIsLoading(true)
      const { data } = await unFollow({
        variables: { username }
      })
  
      client.writeQuery({
        query: IS_FOLLOW,
        data: { isFollow: data.unFollow },
        variables: { username },
      })

      const { followersNumber } = client.readQuery({
        query: GET_FOLLOWERS_NUMBER,
        variables: { username }
      });

      client.writeQuery({
        query: GET_FOLLOWERS_NUMBER,
        data: { followersNumber: followersNumber - 1},
        variables: { username },
      });
      
    } catch (error) {
      console.error(error);
    }finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {
        isFollow
          ? <Button 
            onPress={handleUnFollow} 
            color="default" 
            isLoading={isLoading}
            >
            Dejar de seguir
          </Button>
          : <Button 
            onPress={handleFollow} 
            color="default" 
            isLoading={isLoading}
            >
            Seguir
          </Button>
      }
    </>

  )
}