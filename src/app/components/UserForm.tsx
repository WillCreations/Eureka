
"use client"
import Uploader from "./Uploader";
import { useState } from "react"
import { MdVisibility } from "react-icons/md"
import { MdVisibilityOff } from "react-icons/md"


const UserForm = ({ Action, button }) => {
    const [base, setBase] = useState()
    const [show, setShow] = useState(false)
    const [pass, setPass] = useState("password")
    const Loader = (e) => {
        e.preventDefault()
        console.log("hey")
        const reader = new FileReader()
        console.log(reader)
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result, "result")
                setBase(reader.result)
        }

      
    }
     const Netflix = async (formData) => {
     
        console.log(formData, "onSubmit")
        const { username, email, address, phone, password } = Object.fromEntries(formData)
        
        console.log(base, "image adder")
         const form = {
            username,
            email,
            address,
            phone,
            password,
            picture: base
        }
        
        Action(form)
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
        <form className='my-5 pb-5' action={Netflix}>

                {[
                    "username",
                    "email", 
                    "address",
                    "phone", 
                    "password", 
                ].map((one) => {
                      return (
                          <div
                              key={one}
                              className='relative my-5'
                          >
                              <label
                                  className="capitalize">{one}</label>
                            <input
                                className='p-5 w-full'
                                type={one === "password" ? `${pass}` : "text"}
                                name={one}
                                placeholder={one}              
                              />
                              
                              {one === "password" &&
                                  < div
                                      className="absolute right-0 top-1/2 mx-5 p-2 rounded-full hover:bg-gray-800"
                                      onClick={(e) => { shower(e) }}
                                  >
                                      {!show ? <MdVisibility /> : <MdVisibilityOff />}
                                  </div>}
                          </div>
                      )
                  })
                  } 
            <Uploader
                imagine="picture"
                Upload={Loader}
                image={base}   
            />
              
            <button
                className="float-right bg-green-500 my-2 text-white px-4 py-2 ml-4 rounded hover:bg-green-600"
            >
                {button}
            </button>
              
        </form>
    )
}


export default UserForm;