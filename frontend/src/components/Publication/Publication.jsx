import { 
  Card,
  CardHeader,
  CardFooter,
 } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import PublicationHeader from './PublicationHeader'
import PublicationBody from './PublicationBody'
import PublicationFooter from './PublicationFooter'

// Este componente es la publicaction
export default function Publication({ publicationData, PublicationMenu }) {
  const {
    id, 
    user, 
    description, 
    content, 
    createAt 
  } = publicationData
  const [ since, setSince ] = useState(null)
  const { auth } = useAuth()

  useEffect(() => {

    const createAtPublication = new Date(Number(createAt));
    const now = new Date();
    const diference = now - createAtPublication;
    const seconds = Math.floor(diference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if(days > 31) setSince(createAtPublication
      .toLocaleString('es-ES', { month: 'long' }));
    else if(days) setSince(days + ' d');
    else if(hours) setSince(hours + ' h');
    else if(minutes) setSince(minutes + ' m');
    else setSince(seconds + ' s');

  }, [createAt])

  return (
    <Card 
      className="w-full sm:w-[440px] max-w-[440px] p-5"
      classNames={{
        base: 'bg-transparent hover:bg-default-50 cursor-pointer'
      }}  
    >
      <CardHeader>
        <PublicationHeader 
          id={id} 
          user={user}
          since={since}
          PublicationMenu={PublicationMenu}
          auth={auth}  
        />
      </CardHeader>

      <PublicationBody 
        description={description}
        content={content}
      />

      <CardFooter className="gap-3">
        <PublicationFooter/>
      </CardFooter>
    </Card>
  )
}