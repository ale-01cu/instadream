import { useQuery } from "@apollo/client"
import Publication from './Publication'
import { useEffect, useRef } from "react"
import { Spinner } from "@nextui-org/react"
import useInfinityScroll from "../../hooks/useInfinityScroll"

export default function ListPublication (props) {
  const { 
    queryGQLName = '', 
    queryGQL, 
    BtnDelete, 
    username } = props
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
        data[queryGQLName].data.map( publication => (
          <Publication 
            key={publication.id} 
            publicationData={publication} 
            BtnDelete={BtnDelete}
            refetchPublications={refetch}
          />
        ))
      }
      {
        isLoadingFetchMore
          ? <div className="p-6">
              <Spinner color="primary" size="lg"/>
            </div>
          : null
      }
      <div id='viewfinder' className="" ref={refViewFinder}></div>
    </div>
  )
}