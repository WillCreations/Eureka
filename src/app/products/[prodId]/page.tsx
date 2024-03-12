import Box from "@/app/components/Box"
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import Product from "../../(Engine)/models/productSchema";
import Link from 'next/link'
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import BuyButton from "@/app/components/BuyButton";
import CompGrid from"@/app/components/CompGrid"





const ProductDetails = async ({ params }) => {
  const session = await getServerSession(options)
  await connectToDb();
  const cluster = await Product.findOne({ _id: Object(params.prodId) })
  
  const { _id, name, description, category, price, image, stock } = cluster
  const cate = await Product.find({ category: category })
  const catego = cate.filter((cat) => {return cat._id !== _id })
  console.log("thiscate: ", catego.length)
  console.log("products in this category: ", cate.length)
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
// const arrayone = [...cate]
//   const transCluster = { ...cluster }
   
const arrayone = JSON.stringify(cate)
  const transCluster = JSON.stringify(cluster)

  console.log("arrayone: ", arrayone)
  console.log("transCluster: ",  transCluster)
 

  return (
    <div className="min-h-screen box-border m-1 md:px-10  px-2 pb-96">
      <div className='flex justify-between items-center rounded-md text-xl py-2 bg-gray-800 text-white px-10' >
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
      <div className="flex flex-col lg:flex-row md:justify-between bg-white rounded-md px-2 my-5 text-black">
        <div className="flex flex-col md:flex-row md:items-start ">
          <div className="sm:flex justify-center md:flex-2 mt-5  md:mt-10 ">
            <div className=" relative rounded-md w-full shadow-2xl overflow-hidden h-auto sm:h-60 sm:w-60 ">
              <Image
                className="object-cover object-end"
                src={image}
                alt={description}
                height={500}
                width={500}
              />
              <h3 className="absolute text-white bg-green-700 top-2 py-1 px-2 rounded-sm left-2 items-center">
                ${price}
              </h3>
            </div>
          </div>
          
          <div className="md:flex md:flex-col md:flex-1 p-5">
            
            <div>
              <h1
                className='md:pl-5 text-3xl font-bold text-green-800 pt-7'
              >
                {name}
              </h1>
              <div className='h-28'>
                <h3 className='md:pl-5 py-2 text-sm font-thin'
                >
                  {description}
                </h3>
              </div>
            </div>
           
            <div className='md:ml-5 my-5 pr-5'>
              <BuyButton prod={prime} />
            </div>

          </div>
        
        </div>
        <div className="flex  px-5 lg:flex-col my-5 justify-between items-center lg:items-end">
          <button className='font-bold text-white text-sm bg-green-600 py-3 px-5 lg:mt-3 rounded-md'>
            {category}
          </button>
          <Box
            prod={prime[0]}
          />
        </div>
      </div>

      <CompGrid prodo={arrayone} cluster={transCluster} />
     
    </div>
  )
}

export default ProductDetails