import { getServerSession } from "next-auth/next"
import {options} from "./api/auth/[...nextauth]/options"
import Card from "./components/Card"
import { connectToDb } from "./(Engine)/mongodb/database"
import Product from "./(Engine)/models/productSchema"
import styles from "@/app/Styles/index.module.css"
import Typo from '@/app/components/Typo'
import Slider from "./components/Slider"
import Box from "@/app/components/Box"
import Image from "next/image"



export default async function Home() {

  await connectToDb()
  const Prod = await Product.find()

  
  const session = await getServerSession(options)
  return (
   
    <div className="pt-32">
      <div className="bg-blue-500 text-white px-10 md:px-28 py-20 h-auto md:grid grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold">Welcome to Eureka Tech</h1>
          <p className="mt-2">Start building your Dream Brand Today!</p>
          <p>My name is Princewill Igwe.</p>
          <Typo/>
        </div>
        <div className="w-full flex justify-end">
          <div className=" w-60 hover:scale-105 h-60 overflow-hidden mt-14 md:mt-0 rounded-md">
            <Image
              src="/prince.jpg"
              width={500}
              height={500}
              alt="Igwe Princewill"
            />
          </div>
        </div>
      </div>
      <Slider Prod={Prod} />
      <div
        className='w-full mt-10 py-10 gap-4 flex justify-between overflow-scroll overflow-x-auto h-auto bg-gray-950'
      >
        <div  className={styles.slide2}>
          {Prod.map((p) => {
            return (
              <div key={p._id} className={styles.card} >
                <Card
                  prod={p}
                >
                  <Box
                    prod={p}
                  />
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
