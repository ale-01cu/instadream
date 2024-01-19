import { useQuery } from "@apollo/client"
import Publication from './Publication'
import { useEffect, useRef } from "react"
import { Spinner } from "@nextui-org/react"
import useInfinityScroll from "../../hooks/useInfinityScroll"

// Este componente se encarga de listar todas las publicaciones 
// que se reciven del servidor y tambien tiene la paginacion
// con infinite scroll
export default function ListPublication (props) {
  const { 
    queryGQLName = '', 
    queryGQL, 
    PublicationMenu, 
    username 
  } = props
  const refViewFinder = useRef()
  const { data, loading, error, fetchMore, refetch } = useQuery(
    queryGQL, {
    variables: { username }
  })
  const isLoadingFetchMore = useInfinityScroll(
    data && data[queryGQLName], 
    fetchMore, 
    refViewFinder,
    username
  )

  useEffect(() => {
    refetch()
  }, [username, refetch])

  if(loading) return null
  if(error) return null

  return (
    <div className="flex flex-col items-center">
      {
        data[queryGQLName]?.data?.map( publication => (
          <Publication 
            key={publication.id} 
            publicationData={publication} 
            PublicationMenu={PublicationMenu}
          />
        ))
      }
      {
        isLoadingFetchMore
          ? <div className="p-6">
              <Spinner
                color="primary" 
                size="lg"
              />
            </div>
          : null
      }
      <div 
        id='viewfinder' 
        ref={refViewFinder}>
      </div>

      
    </div>
  )
}