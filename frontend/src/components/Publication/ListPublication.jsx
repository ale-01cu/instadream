import { LIST_ALL_PUBLICATIONS } from "../../gql/publication"
import { useQuery } from "@apollo/client"
import Publication from './Publication'

export default function ListPublication () {
  const { data, loading, error } = useQuery(LIST_ALL_PUBLICATIONS, {
    variables: {}
  })
  
  if(loading) return null
  console.log(error);
  if(error) return null

  console.log(data);
  const { listAllPublication } = data

  return (
    <div className="flex flex-col items-center">
      {
        listAllPublication.map( publication => (
          <Publication key={publication.id} publicationData={publication}/>
        ))
      }
    </div>
  )
}