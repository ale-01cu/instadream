import { useState, useEffect } from "react";

export default function useInfinityScroll(data, fetchMore, refViewFinder, username) {
  const [ isLoadingFetchMore, setIsLoadingFetchMore ] = useState(false)

  useEffect(() => {
    let observer = null
    const target = refViewFinder.current

    const onLoadMore = async (entries) => {
      const element = entries[0]
      if(element.isIntersecting) {
        setIsLoadingFetchMore(true)
        const dataSize = data.data.length
        const lastItem = data.data[ dataSize - 1 ]
        const lastId = lastItem.id

        fetchMore({variables: { lastId, username }})
        .then(() => setIsLoadingFetchMore(false))
      }
    }
    
    if (data?.next) {
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

  }, [data, fetchMore, refViewFinder, username])

  return isLoadingFetchMore

}