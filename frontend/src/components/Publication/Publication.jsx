import { 
  Card,
  Button,
  CardHeader,
  CardFooter,
  Avatar,
  Image
 } from '@nextui-org/react'
 import { BASE_URL } from '../../utils/constants'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'

export default function Publication({ publicationData, BtnDelete, refetchPublications }) {
  const {
    id, 
    user, 
    description, 
    content, 
    createAt } = publicationData
  const [ since, setSince ] = useState(null)
  const { auth } = useAuth()

  useEffect(() => {
    // Convierte el timestamp a un objeto Date
    let createAtPublication = new Date(Number(createAt));
    // Obtén la fecha y hora actuales
    let now = new Date();
    // Calcula la diferencia en milisegundos
    let diference = now - createAtPublication;
    // Convierte la diferencia a segundos, minutos, horas, días, etc. según lo necesites
    let seconds = Math.floor(diference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    if(days > 31) setSince(createAtPublication.toLocaleString(
      'es-ES', 
      { month: 'long' 
    }));
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
      <CardHeader className="justify-between">
        <Link to={'/' + user.username}>
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src={BASE_URL + '/' + user.avatar} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600 space-x-2">
                <span>{user.name}</span>
                <span className='text-default-400 text-small font-semibold leading-none'>
                  {since}
                </span>
              </h4>
              <h5 className="text-small tracking-tight text-default-400">@{user.username}</h5>
            </div>
          </div>
        </Link>
        {
          (BtnDelete && auth.username === user.username ) &&
            <BtnDelete idPublication={id} refetchPublications={refetchPublications}/>
        }
      </CardHeader>
      <div className="px-3 py-0 text-small text-default-400">
        <p className='text-lg'>
          {description}
        </p>
        <div className={`py-5 grid ${content.length === 1 || content.length === 2 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {
            content.map((c, index) => (
              <div 
                key={c.id} 
                className={
                  `${content.length === 3 && index === 2 ? 'col-span-2' : ''}`
                }
              >
                <Image
                  alt="Card background"
                  className={`object-cover ${content.length === 3 ? 'h-full w-full' : ''} rounded-xl`}
                  src={BASE_URL + '/' + c.path}
                  classNames={{
                    wrapper: `${content.length === 3 ? 'h-full w-full' : ''}`
                  }}
                />
              </div>
            ))
          }
        </div>
         <span className="pt-2">
          #FrontendWithZoey 
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span>
      </div>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-lg">4</p>
          <p className=" text-default-400 text-lg">Reacciones</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-lg">97.1K</p>
          <p className="text-default-400 text-lg">Reposts</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-lg">97.1K</p>
          <p className="text-default-400 text-lg">Comentarios</p>
        </div>
      </CardFooter>
    </Card>
  )
}