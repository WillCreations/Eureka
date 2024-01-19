"use client"
import { useEffect } from 'react'
import Typed from 'typed.js'


const Typo = () => {

    useEffect(() => {
        var typed = new Typed(".text", {
            strings: ['Fullstack ^1000 Developer', 'Brand ^1000 Strategist', 'Graphic ^1000 Designer'],
            typeSpeed: 200,
            backSpeed: 200,
            backDelay: 1000,
            loop: true,
            fadeOut: false,
        })

        typed
    }, [])

  return (
      <div>
          <p>I'm a <span className="text text-green-300 font-extrabold text-2xl"></span></p>
      </div>
  )
}

export default Typo