"use client"
import { useContext, useState, usecontext } from 'react'
import { MdVisibility } from "react-icons/md"
import { MdVisibilityOff } from "react-icons/md"
import { useRouter } from 'next/navigation'
import { signIn, getProviders, useSession } from 'next-auth/react'
import Link from 'next/link'
import  RecoveryContext from '@/contextProvider/Recovery'

const Login = () => {
    const router = useRouter();
    const Provider = getProviders()
    const [show, setShow] = useState(false)
    const [showing, setShowing] = useState(false)
    const [success, setSuccess] = useState(false)
    const [pass, setPass] = useState("password")
    const { data: session } = useSession()
    const { setPage, setOtp} = useContext(RecoveryContext)
    const [data, setData] = useState({
        email: "",
        password:""
        
    })
    console.log(session,  "pre session in login")

    const Logger = async (e) => {
        e.preventDefault();

        const log = await signIn("credentials", {
                ...data,
                redirect: false
        })
        console.log(log, "loggger")
        if (!log.ok) {
            setShowing(true)
           
       } else {
            setSuccess(true)
            router.push('/')
       }
        
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


    const SendOtp = async () => {
        const OTP = Math.floor(Math.random() * 9000 + 1000)
        setOtp(OTP)
        const response = await fetch('/api/recovery', {
            method: "POST",
            body:JSON.stringify({
                OTP,
                recepient_Email: data.email
            })
        })
       
        setPage((prev) => { return "otp"; })
        
        
        
     
    }
  return (
      <div className='flex  justify-center'>
          <div className='w-64 my-5'>
              <div className='my-5'>
                  <button
                    className='btn btn-primary w-full rounded-md'
                    onClick={() => {signIn("google")}}
                  >
                      Signin with Google
                  </button>
              </div>
                <form className='my-5 pb-5' onSubmit={Logger}>
              
                  <div className='my-5 w-full'>
                      <label>Email</label>
                      <input
                        className='p-5 w-full rounded-md'
                        type="text"
                        placeholder="@example.com"
                        value={data.email}
                        onChange={(e) => {setData({...data, email: e.target.value})}}
                        />
                    </div>
                  <div className='my-5 w-full relative'>
                      <label>Password</label>
                      <input
                        className='p-5 w-full rounded-md'
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
                  
                  <div className={`flex align-center  ${showing ? "justify-between" : "justify-end"} items-center`} >
                      {showing ?
                          <div>
                              <p
                                  className='text-red-500'
                              >
                                  Login Failed
                              </p>
                              Please
                              <Link
                                  href="/register"
                              >
                                  <span
                                      className='text-blue-500 underline'
                                  >
                                       Register
                                  </span>
                              </Link>
                          </div> : null}
                      
                      {success ?
                              <div>
                                  <p
                                      className='text-green-500'
                                  >
                                      Login Successful
                                  </p>
                              </div> : null}
                     
                     
                      <button
                          className="float-right bg-green-500 my-2 text-white px-4 py-2 ml-4 rounded hover:bg-green-600"
                      >
                          Login
                      </button>
                  </div>
                  
              
              </form>
              <button
                  onClick={ SendOtp}
              >
                  Forgot password
              </button>
          </div>
          
      </div>
  )
}

    export default Login;