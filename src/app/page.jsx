import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";
import Card from "./components/Card";
import { connectToDb } from "./(Engine)/mongodb/database";
import Product from "./(Engine)/models/productSchema";
import * as styles from "@/app/Styles/index.module.css";
import Typo from "@/app/components/Typo";
import Slider from "./components/Slider";
import Box from "@/app/components/Box";
import Image from "next/image";

import Navbutton from "./components/Navbutton";

export default async function Home() {
  await connectToDb();
  const Prod = await Product.find();

  const session = await getServerSession(options);
  return (
    <div className="min-h-screen">
      <div className="bg-blue-500 text-white px-10 md:px-28 py-20 h-auto md:grid grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold">Welcome to Eureka Tech</h1>
            <p className="mt-2">Start building your Dream Brand Today!</p>
            <p>My name is Princewill Igwe.</p>
            <Typo />
          </div>

          <Navbutton />
        </div>
        <div className="w-full flex justify-end">
          <div
            className={` ${styles.cover} flex items-center justify-center w-60 shadow hover:shadow-2xl hover:scale-105 relative cursor-pointer hover:-rotate-6 transition h-60 overflow-hidden mt-14 md:mt-0 rounded-md`}
          >
            <Image
              className="translate-y-5"
              src="/prince.jpg"
              width={500}
              height={500}
              alt="Igwe Princewill"
            />

            <h1 className=" absolute p-1 rounded-md bg-black z-20 text-5xl font-extrabold">
              Portfolio
            </h1>
            <div className="absolute  z-10 opacity-1  bg-green-700 top-0 bottom-0  w-full h-full"></div>
          </div>
        </div>
      </div>
      {/* <Slider Prod={Prod} /> */}
      {/* <div
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
      </div> */}
    </div>
  );
}
