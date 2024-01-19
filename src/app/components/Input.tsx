import React from 'react'

const Input = ({setInput, input, name}) => {
     const HandleChange = (e) => {
       
         setInput({...input, [name]: e.target.value})
        
    }

  return (
      <input className='mx-2 rounded-md w-full py-1 px-3' name={name} type="text"  onChange={ HandleChange} />
  )
}

export default Input