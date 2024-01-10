import { LIST_ALL_PUBLICATIONS } from "../../gql/publication"
import { useQuery } from "@apollo/client"
import Publication from './Publication'
import { useRef, useEffect, useCallback, useState } from "react"
import { Spinner } from "@nextui-org/react"

export default function ListPublication () {
  const refViewFinder = useRef()
  const [ isLoadingFetchMore, setIsLoadingFetchMore ] = useState(false)
  const { data, loading, error, fetchMore } = useQuery(LIST_ALL_PUBLICATIONS, {
    variables: {}
  })

  useEffect(() => {
    let observer = null
    const target = refViewFinder.current

    const onLoadMore = async (entries) => {
      const element = entries[0]
      if(element.isIntersecting) {
        setIsLoadingFetchMore(true)

        fetchMore({
          variables: { lastId: data.listAllPublication.data[
            data.listAllPublication.data.length - 1].id },
        }).then(() => {
          setIsLoadingFetchMore(false)
        })
      }
    }
    
    if (data && data.listAllPublication.next) {
        observer = new IntersectionObserver(onLoadMore, {
          rootMargin: '200px',
        })

        if (target) observer.observe(target)
    }

    return () => {
      if(observer) {
        observer.disconnect()
      }
    }

  }, [data, fetchMore])

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