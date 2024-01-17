import InstadreamLogoImg from '../../assets/img/_980c5c17-82b7-4017-9194-b1aae4fcc78a.jfif'
import { Image } from '@nextui-org/react'

export default function InstadreamLogo() {

  return (
    <Image 
      width={35} 
      height={35} 
      className='rounded-2xl min-w-[35px]' 
      src={InstadreamLogoImg}
    />
  )
}