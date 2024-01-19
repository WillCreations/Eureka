"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from "react-icons/bs"
import { useRouter } from "next/navigation"
import {runFireworks} from "@/app/(Engine)/utils/utils"
const Success = () => {
    const [order, setOrder ] = useState(null)

    useEffect(() => {
        runFireworks()
    }, [])


  return (
      <div className="flex justify-center">
          <div  className="flex flex-col justify-center items-center h-96">
              <BsBagCheckFill/>
              <p className="my-10">successfull purchase</p>
              <Link href="/products">
                  <button className='btn btn-success'>Continue Shopping</button>
              </Link>
          </div>
      </div>
  )
}

export default Success