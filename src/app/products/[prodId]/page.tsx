import Box from "@/app/components/Box"
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import Product from "../../(Engine)/models/productSchema";
import Link from 'next/link'
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image"
import BuyButton from "@/app/components/BuyButton"




const ProductDetails = async ({ params }) => {
  const session = await getServerSession(options)
  await connectToDb();
  const cluster = await Product.findOne({ _id: Object(params.prodId) })
  const { _id, name, description, category, price, image, stock } = cluster

  const prime = [
    {
      _id: _id.toString(),
      name,
      description,
      category,
      price,
      image,
      stock
    }
  ]


 

  return (
    <div className="h-full m-1 px-10 pb-96">
      <div className='flex justify-between items-center rounded-full text-xl py-2 bg-gray-800 text-white px-10' >
        <h2>ProductDetails</h2>
        <div>
                
          {session?.user.email === "admin@gmail.com" &&
            <Link href={`/products/${params.prodId}/edit`}>
              <button className=' text-sm  bg-green-600 py-1 px-5  rounded-md'>
                Edit
              </button>
            </Link>
          }
        </div>
      </div>
      <div className="flex justify-between bg-white rounded-md px-5 my-5 text-black">
        <div className="flex items-center">
          <div className="relative rounded-md shadow-2xl overflow-hidden h-60 w-60 ">
            <Image
              objectFit="cover"
              src={image}
              alt={description}
              height={500}
              width={500}
            />
            <h3 className="absolute text-white bg-green-700 top-2 py-1 px-2 rounded-sm left-2 items-center">
              ${price}
            </h3>
          </div>
          <div>
            <h1
              className='pl-10 text-3xl font-bold text-green-800 pt-7'
            >
              {name}
            </h1>
            <h3 className='pl-10 py-2 text-sm font-thin'
            >
              {description}
            </h3>
           
            <div className='ml-10 my-5 '>
              <BuyButton prod={prime} />
            </div>
          </div>
        </div>
        <div className="flex flex-col my-5 justify-between items-end">
          <button className='font-bold text-white text-sm bg-green-600 py-1 px-5 mt-3 rounded-full'>
            {category}
          </button>
          <Box
            prod={prime[0]}
          />
        </div>
      </div>
     
    </div>
  )
}

export default ProductDetails