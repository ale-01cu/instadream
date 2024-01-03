import Profile from '../../components/User/Profile'
import { useParams } from 'react-router-dom'

export default function User () {
  const { username } = useParams()

  return (
    <main className='w-full flex justify-center p-8'>
      <Profile username={username}/>
    </main>
  )
}