"use client"
import React from 'react'

const CartButton = ({ SingleProd, AddHandler, show, colour }) => {
  
  
  return (
      
      <button
        className={`py-3 px-5 rounded-md w-full transition-all active:scale-105 ${colour}`}
        onClick={() => { AddHandler(SingleProd) }}
      >
        {show}
      </button>
  )
}

export default CartButton