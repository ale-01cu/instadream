import { 
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Image
 } from '@nextui-org/react'
 import { BASE_URL } from '../../utils/constants'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Publication({ publicationData }) {
  const { user, description, content, createAt } = publicationData
  const [ since, setSince ] = useState(null)

  useEffect(() => {
    // Convierte el timestamp a un objeto Date
    let fechaPasada = new Date(Number(createAt));

    // Obtén la fecha y hora actuales
    let ahora = new Date();

    // Calcula la diferencia en milisegundos
    let diferencia = ahora - fechaPasada;
    // Convierte la diferencia a segundos, minutos, horas, días, etc. según lo necesites
    let segundos = Math.floor(diferencia / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    if(dias > 31) setSince(fechaPasada.toLocaleString('es-ES', { month: 'long' }));
    else if(dias) setSince(dias + ' d');
    else if(horas) setSince(horas + ' h');
    else if(minutos) setSince(minutos + ' m');
    else setSince(segundos + ' s');
  }, [createAt])

  return (
    <Card 
      className="w-[440px] max-w-[440px] max-h-[600px] p-5"
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
      </CardHeader>
      <div className="px-3 py-0 text-small text-default-400">
        <p>
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
                  className="object-cover rounded-xl"
                  src={BASE_URL + '/' + c.path}
                  width={270}
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
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Reacciones</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Reposts</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Comentarios</p>
        </div>
        
      </CardFooter>
    </Card>
  )
}