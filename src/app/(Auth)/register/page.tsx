"use client"
import { useState, useEffect } from "react"
import Link from 'next/link'
import { MdVisibility } from "react-icons/md"
import { MdVisibilityOff } from "react-icons/md"
import { useRouter } from "next/navigation"


const Register = () => {
    const router = useRouter();
    const [show, setShow] = useState(false)
    const [showing, setShowing] = useState(false)
    const [success, setSuccess] = useState(false)
    const [pass, setPass] = useState("password")
    const [data, setData] = useState({
        name: "",
        email: "",
        password:""
        
    })


    const AddUser = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type" : " application/json"
            },
            body: JSON.stringify({data})
        })
        console.log(response, "responsidizer")
        const userinfo = await response.json()
        console.log(userinfo, "userinfo")
        response.ok && setShowing(true) 
        router.push("/login")

    }

    const shower = (e) => {
        e.preventDefault()
        if (!show){
            setShow(true)
            setPass("text")
        } else {
            setShow(false) 
            setPass("password")
        }
    }


    return (
        <>
            <div className='flex justify-center'>
                <div className='w-64 my-5'>
                    <div className='my-5'>
                        <p className="text-black">register</p>
                    </div>
                    <form className='my-5 pb-5' onSubmit={AddUser}>
                        <div className='my-5 w-full'>
                            <label>Username</label>
                            <input
                                className='p-5  w-full rounded-md'
                                type="text"
                                placeholder="John Doe"
                                value={data.name}
                                onChange={(e) => { setData({ ...data, name: e.target.value })}}
                            />
                        </div>
              
                        <div className='my-5 w-full'>
                            <label>Email</label>
                            <input
                                className='p-5  w-full rounded-md'
                                type="text"
                                placeholder="@example.com"
                                value={data.email}
                                onChange={(e) => {setData({...data, email: e.target.value})}}
                            />
                        </div>
                        
                        <div className='my-5 w-full relative'>
                            <label>Password</label>
                            <input
                                className='p-5  w-full rounded-md'
                                type={`${pass}`}
                                placeholder="Password"
                                value={data.password}
                                onChange={(e) => { setData({ ...data, password: e.target.value })}}
                            />
                            < div
                          className="absolute right-0 top-1/2 mx-5 p-2 rounded-full hover:bg-gray-800"
                          onClick={(e) => { shower(e) }}
                      >
                          {!show ? <MdVisibility /> : <MdVisibilityOff />}
                      </div>
                        </div>

                        <div className={`flex align-center  ${showing ? "justify-between" : "justify-end"} items-center`}>
                            {showing ?
                              <div>
                                  <p
                                      className='text-green-500'
                                  >
                                      Registeration Successful
                                  </p>
                              </div> : null}
                            <button
                                className="float-right bg-green-500 my-2 text-white px-4 py-2 ml-4 rounded hover:bg-green-600"
                            >
                                Register
                            </button>
                        </div>
              
                    </form>
                </div>
          
            </div>
        </>
  )
}

export default Register