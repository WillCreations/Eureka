"use client"
import Uploader from "@/app/components/Uploader"
import { useState, useEffect } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const ProductForm = ({ Action, button, count }) => {
    const [base64, setBase64] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const Loader = (e) => {
        e.preventDefault()
        console.log("hey")
        const reader = new FileReader()
        console.log(reader)
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result, "result")
                setBase64(reader.result)
        }

      
    }

    useEffect(() => {
        setIsLoading(false)
    }, [count])
     
    const Netflix = async (formData) => {

        setIsLoading(true)
        try {
            
     
        console.log(formData, "onSubmit")
        const { name, category, price, description, slug }  = Object.fromEntries(formData)
        

        const form = {
            name,
            category,
            price,
            description,
            slug,
            image: base64,
            stock: 1
        } 
        
        Action(form)
        
        
         
      } catch (error) {
          setIsLoading(false)
          console.log(error)
      }
        
    }
     

    return (
        <form className='my-5 pb-5' action={Netflix}>

            {[  "name",
                "description",
                "category",
                "price",
                "slug",
            ].map((one) => { 
               return (
                   <div className='my-5 ' key={one}>
                    <label className="capitalize">{one}</label>
                    <input
                    className='p-5 w-full rounded-md'
                    type="text"
                    name={one}
                    placeholder={one}              
                />
           </div>
           )
            })}
                  
            <Uploader
                imagine="image"
                Upload={Loader}
                image={base64}
            />
            <button
                className="flex items-center float-right bg-green-500 my-2 text-white px-4 py-2 ml-4 rounded hover:bg-green-600"
            >
              {isLoading && <div  className="mr-2 animate-spin"><AiOutlineLoading3Quarters/> </div>}{button}
            </button>
              
        </form>
    )
}


export default ProductForm;