"use client"
import Uploader from "@/app/components/Uploader"
import {useState, useEffect} from "react"
import Image from "next/image"
import { MdVisibility } from "react-icons/md"
import { MdVisibilityOff } from "react-icons/md"


const UserEdit = ({ Updater, parameter, Use}) => {
    const [base, setBase] = useState("")
    const [show, setShow] = useState(false)
    const [pass, setPass] = useState("password")
    const [error, setError] = useState("")
    const { name, email, address, phone, picture } = Use

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
     
        try {
           
            console.log(formData, "onSubmit")
            const {id, username, email, address, phone, password } = Object.fromEntries(formData)
        
            console.log(base, "base10 kor")

            const form = {
             id,
             username,
             email,
             address,
             phone,
             picture: base,
             password 
            }
        
            const response = await Updater(form)
            if (response) {
                    console.log(response)
            }
       
        } catch (error) {
            setError(error.message)
            
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
   
  return (
      <div className='flex justify-center'>
          <div className='p-10'>
              <Image src={picture} alt={name} width={100} height={100}/>
          </div>
                <div className='w-64 my-5'>
                    <div className='my-5'>
                        <p className="text-white">Update Profile</p>
                    </div>
              <form className='my-5 pb-5' action={Netflix}>
                  <div className='my-5 w-full'>
                            
                            <input
                                className='p-5'
                          type="hidden"
                          name="id"
                          value={parameter}
                                
                                
                            />
                  </div>
                  {[
                      { name: "username", place: name },
                      { name: "email", place: email },
                      { name: "address", place: address },
                      { name: "phone", place: phone },
                      { name: "password", place: "password" }
                  ].map((one) => {
                      return (
                          <div 
                              key={one.name}
                              className='my-5 relative'
                          >
                              <label
                                  className="capitalize">{one.name}</label>
                              <input
                                  className='p-5 w-full rounded-md'
                                  type={one.place === "password" ? `${pass}` : "text"}
                                  name={one.name}
                                  placeholder={one.place}
                              />
                              
                              {one.name === "password" &&
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
                  <div>{error}</div>
                  <Uploader
                      imagine="picture"
                      Upload={Loader}
                      image={base}
                  />
              
                        <button
                            className="float-right bg-green-500 my-2 text-white px-4 py-2 ml-4 rounded hover:bg-green-600"
                        >
                            update
                        </button>
              
                    </form>
                </div>
          
            </div>
  )
}

export default UserEdit