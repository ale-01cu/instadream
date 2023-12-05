import Profile from '../../components/Profile'
import { useParams } from 'react-router-dom'

export default function User () {
  const { username } = useParams()

  return (
    <main className='w-full flex justify-center'>
      <Profile username={username}/>
    </main>
  )
}