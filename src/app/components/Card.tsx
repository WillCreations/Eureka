import Image from 'next/image'
import Link from 'next/link'

const Card = ({prod, children}) => {
  return (
     <div className='bg-green-700 w-full rounded-md overflow-hidden transition-scale-0.5s hover:scale-105'
              key={prod._id}
            >
              <div className='w-full'>
                <Link href={`/products/${prod._id}`}>
                <Image
                  style={{objectFit: "cover"}}
                  src={prod.alt_image? prod.alt_image : prod.image}
                  alt={prod.description}
                  width={500}
                  height={200}
                  loading='lazy'
                  placeholder='blur'
                  blurDataURL={prod.alt_image? prod.alt_image : "/avatar/avatar.svg"}
                />
                 </Link>
              </div>
              <div className='flex flex-col p-5'>
              <div>
                  <h2 className='text-2xl'>{prod.name}</h2>
                  <h2 >{prod.category}</h2>
              </div>

                <div className='flex justify-end mt-5'>
                  {children}
                </div>
              </div>  
        </div>
  )
}

export default Card