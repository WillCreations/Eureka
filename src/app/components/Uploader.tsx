"use client"
import { useState } from 'react'
import Image from 'next/image'

const Uploader = ({imagine, image, Upload}) => {
    
    



  

    console.log(image, "In uploader")

  return (

    
        <div className='my-5 '>
            <label>Image</label>
                <div className='mb-5 flex rounded-md justify-between items-center text-black bg-white py-1 px-4'>
                    <input
                        className='py-5 w-1/2'
                        type="file"
                        accept="image/*"
                        name={imagine}
                        onChange={(e) => { Upload(e) }}
                  
                    />
                {image === "" || image === undefined ? "" :
                  <div
                      className='overflow-hidden h-14 w-14 rounded-md shadow-xl'
                  >
                        <Image
                        
                        alt=''
                        width={100}
                        height={100}
                        src={image}
                        objectFit='cover'
                        />
                    </div>
                }
                </div>
        </div>
   
  )
}

export default Uploader