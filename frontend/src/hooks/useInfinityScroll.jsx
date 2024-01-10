import { useLazyQuery } from "@apollo/client";
import { LIST_ALL_PUBLICATIONS } from "../gql/publication";
import { useState, useEffect } from "react";

export default function useInfinityScroll(refViewFinder) {
  const [offset, setOffset] = useState(1)
  const [isViewFinder, setIsViewFinder] = useState(false)
  const [ data, setData ] = useState([])
  const [ listAllPublication ] = useLazyQuery(LIST_ALL_PUBLICATIONS)


  useEffect(() => {
    let observer = null
    const target = refViewFinder.current

    const onLoadMore = (entries) => {
      console.log('observando: cargando mas data...');
    }
    
    if (!isViewFinder) {
        observer = new IntersectionObserver(onLoadMore, {
          rootMargin: '50px',
        })

        if (target) observer.observe(target)
    }

    return () => {
      if(observer) {
        observer.disconnect()
      }
    }

  }, [isViewFinder, refViewFinder, listAllPublication, offset])


  return [data]
}