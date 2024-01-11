import ListPublication from '../../components/Publication/ListPublication'
import { LIST_ALL_PUBLICATIONS } from '../../gql/publication'

export default function Home () {

  return (
    <main className="">
      <ListPublication 
        queryGQLName='listAllPublication'
        queryGQL={LIST_ALL_PUBLICATIONS}
      />
    </main>
  )
}