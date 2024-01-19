"use client"
import  {useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { FaCartShopping, FaBars } from "react-icons/fa6"
import ProductCart from '../../contextProvider/Prod'
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { IoClose } from "react-icons/io5"


const Navbar = () => {
  const [touch, setTouch] = useState("hidden");
  const [cartIcon, setCartIcon ] = useState(<FaCartShopping />)
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const [ user, setUser ] = useState()
  

    const Pixel = async () => {
      const response = await fetch(`/api/user?search=${session?.user.name}`)
      const data = await response.json()
      console.log(data, "da da da ta")
      setUser(data)
    }


  useEffect(() => {
    Pixel()
  }, [])

  useEffect(() => {
    Pixel()
  }, [session])
    
 
  const parallax = useContext(ProductCart)
  const Num = parallax.CartNumber

  const Toggler = () => {
    if (!isOpen) {
      setTouch("block")
      setCartIcon(`Cart`)
      setIsOpen(true)
    } else {
      setTouch("hidden");
      setCartIcon(<FaCartShopping />);
      setIsOpen(false)
    }
  };

  const handleSignout = () => {
    signOut(
      {redirect: false}
    );
    router.push('/')
  }

  
   
  console.log(user, "current user")

  console.log(session?.user.name, "user")
  
  return (
    <div className='md:flex fixed top-0 left-0 z-50 w-full bg-black justify-between block md:items-Start py-8 pb-0'>
      <div className='flex justify-between items-start'>
        <h1 className='mx-10 mb-5 font-bold text-blue-300 text-lg'>Eureka</h1>
        <div onClick={Toggler} className='md:hidden mx-4 pr-10 hover:text-blue-300 relative'>
          {isOpen ? <IoClose/> : <FaBars />}
          {!session || Num === 0 ? null :
            <span
              className='text-xs bg-red-900 text-white py-1 px-2 rounded absolute left-2 bottom-2'
            >
            {Num}
          </span>}
        </div>
      </div>
      
     
      <div >
        {session? (
          <ul className={`md:flex items-center py-5 md:py-0 md:pr-10 ${touch} text-sm text-black md:text-white bg-white md:bg-black w-full`}>
            <li className='mx-6  hover:text-blue-300'>
            <Link href="/">Home </Link>
            </li>
            <li className='mx-6  hover:text-blue-300'>
            <Link href="/products">Products </Link>
            </li>
            <li className='mx-6 relative hover:text-blue-300'>
            <Link href="/cart"> {cartIcon} </Link>
            { Num === 0 ? null : <span className='text-sm bg-red-900 text-white py-1 px-2 rounded md:absolute left-5 bottom-2'>
              {Num}
            </span>}
            </li>
            <li className='mx-6 flex items-center' >
              <div className='flex justify-center rounded-full overflow-hidden w-6 h-6'>
                <Image
                  src={user?.picture || "/next.svg"}
                  alt={"profile picture"}
                  object-fit='cover'
                  width={20}
                  height={10}
                />
              </div> 
              <Link href={`/users/${session?.user.name}`}>
                <span className='ml-2'>
                  {session?.user.name}
                </span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => { handleSignout() }}
                className="text-green-500 hover:text-red-800 md:bg-green-500 md:hover:bg-red-700 md:hover:text-white md:text-white mx-6 md:mx-0 md:px-4 py-2 md:ml-4 rounded"

                >
                  Sign out
              </button>
            </li>
          </ul>  
            ) : (
             <ul className={`md:flex items-center py-5 md:py-0 md:pr-10 ${touch} text-sm text-black md:text-white bg-white md:bg-black w-full`}>
              <li>
                
                <Link href="/login">
                  <button
                    className="text-black hover:text-green-500 md:bg-green-500 md:text-white mx-6 md:mx-0 md:px-4 py-2 md:ml-4 rounded md:hover:bg-green-600"
                    >
                    Sign in
                  </button>
                </Link>
               
              </li>
                           
              <li>
                <Link href="/register">
                  <button
                  className="text-black hover:text-green-500 md:bg-green-500 md:text-white mx-6 md:mx-0 md:px-4 py-2 md:ml-4 rounded md:hover:bg-green-600"
                  >
                  Register
                  </button>
                </Link>
              </li>
          </ul>
        )}
        
      </div>
    </div>
  )
}

export default Navbar