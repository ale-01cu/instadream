import { LIST_ALL_PUBLICATIONS } from "../../gql/publication"
import { useQuery } from "@apollo/client"
import Publication from './Publication'
import { useRef, useEffect, useCallback, useState } from "react"
import { Spinner } from "@nextui-org/react"
import useInfinityScroll from "../../hooks/useInfinityScroll"

export default function ListPublication () {
  const refViewFinder = useRef()
  const { data, loading, error, fetchMore } = useQuery(
    LIST_ALL_PUBLICATIONS, {
    variables: {}
  })
  const isLoadingFetchMore = useInfinityScroll(
    data?.listAllPublication, 
    fetchMore, 
    refViewFinder
  )

  if(loading) return null
  if(error) return null


  return (
    <div className="flex flex-col items-center">
      {
        data.listAllPublication.data.map( publication => (
          <Publication key={publication.id} publicationData={publication}/>
        ))
      }
      <div id='viewfinder' className="" ref={refViewFinder}></div>
      {
        isLoadingFetchMore
          ? <div className="p-6">
              <Spinner color="primary" size="lg"/>
            </div>
          : null
      }

    </div>
  )
}