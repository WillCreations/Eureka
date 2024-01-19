"use client"

import Uploader from "@/app/components/Uploader"
import { useState } from "react"
import Image from "next/image"


const EditForm = ({Updater, Parameter, Prod}) => {
    
    const [base, setBase] = useState("")
    const { name, category, price, description, image, slug } = Prod

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
        const { id, name, category, price, description, slug } =
            Object.fromEntries(formData)
       
        console.log(slug, "slug in form prep")
         
        const form = {
            id,
            name,
            category,
            price,
            description,
            slug,
            image: base
        }
        
        Updater(form)
    }

      console.log(base, "base10 kor outside")
   
  return (
      <div className='flex flex-col w-full items-center justify-start'>
            <div className='my-5'>
                <p className="text-white">Update Product</p>
            </div>
          
        <div className='flex justify-between my-5 bg-gray-900 py-5 px-10 mx-10 md:w-1/2 rounded-md'>
                <div className="w-1/2 m-3">
                  <div className='mt-5 mr-5 rounded-md overflow-hidden w-full'>
                      <Image
                          src={image}
                          alt={description}
                          width={400}
                          height={400}
                          objectFit="cover"
                      />
                  </div>
                </div>
              <form className=' pb-5 w-full'  action={Netflix}>
                  
                   <div className='my-5 w-full'>
                    <input
                        className='p-5'
                        type="hidden"
                        name="id"
                        value={Parameter}
                    />
                  </div>
                  {[
                      { name: "name", place: name },
                      { name: "category", place: category },
                      { name: "description", place: description },
                      { name: "price", place: price },
                      { name: "slug", place: slug }
                  ].map((one) => {
                      return (
                          <div
                              className='mb-3'
                          >
                              <label
                                  className="capitalize">{one.name}</label>
                            <input
                                className='p-5 w-full rounded-md'
                                type="text"
                                name={one.name}
                                placeholder={one.place}              
                            />
                          </div>
                      )
                  })
                  }             
            
                  <Uploader
                      imagine="image"
                      Upload={Loader}
                      image={base}
                  />
            <button
                className="float-right bg-green-500 my-2 text-white px-4 py-2 ml-4 rounded hover:bg-green-600"
            >
                Update
            </button>
              
            </form>
                </div>
          
            </div>
  )
}

export default EditForm