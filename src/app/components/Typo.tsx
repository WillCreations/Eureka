"use client"
import { useEffect } from 'react'
import Typed from 'typed.js'


const Typo = () => {

    useEffect(() => {
        var typed = new Typed(".text", {
            strings: ['Full ^1000 Stack ^1000 Developer', 'Brand ^1000 Strategist', 'Graphic ^1000 Designer'],
            typeSpeed: 150,
            backSpeed: 150,
            backDelay: 1000,
            loop: true,
            fadeOut: false,
        })

        typed
    }, [])

  return (
      <div>
          <p>I&apos;m a <span className="text text-green-300 font-extrabold text-2xl"></span></p>
      </div>
  )
}

export default Typo