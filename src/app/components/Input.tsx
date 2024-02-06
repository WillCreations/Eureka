import React from 'react'

const Input = ({setInput, input, name}) => {
     const HandleChange = (e) => {
       
         setInput({...input, [name]: e.target.value})
        
    }

  return (
    <input className='rounded-md w-full h-10 py-1 text-center px-3'
      name={name}
      type="text"
      onChange={HandleChange}
    />
  )
}

export default Input