import { Image } from "@nextui-org/react"
import { BASE_URL } from "../../utils/constants"

export default function PublicationBody({ description, content }) {
  return (
    <div className="px-3 py-0 text-small text-default-400">
      <p className='text-lg'>
        {description}
      </p>
      <div className={`
        py-5 grid 
        ${content.length === 1 || content.length === 2 
          ? 'grid-cols-1' 
          : 'grid-cols-2'
        }
      `}>
        {
          content.map((c, index) => (
            <div 
              key={c.id} 
              className={`${
                content.length === 3 && index === 2 
                  ? 'col-span-2' 
                  : ''
              }`}
            >
              <Image
                alt="Card background"
                className={`
                  object-cover 
                  ${content.length === 3 
                      ? 'h-full w-full' 
                      : ''
                  } 
                  rounded-xl
                `}
                src={BASE_URL + '/' + c.path}
                classNames={{
                  wrapper: `
                    ${content.length === 3 
                      ? 'h-full w-full' 
                      : ''
                    }`
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
  )
}