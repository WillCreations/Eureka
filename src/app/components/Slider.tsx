"use client"
import { useRef } from 'react'
import Card from './Card'
import styles from "@/app/Styles/index.module.css"

const Slider = ({Prod}) => {
    const ScrollerRef = useRef(null)

    const ScrollHorizontally = (e) => {
        const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
        const scrollContainer = ScrollerRef.current
        if (scrollContainer) {
            scrollContainer.scrollLeft -= delta * 40; 
            e.preventDefault();   
        }
    
    }

  return (
    <div
        className='w-full  mt-10 py-10 gap-4 flex justify-between overflow-scroll overflow-x-auto h-auto bg-gray-950'
        onWheel={(e) => { ScrollHorizontally(e) }}
        ref={ScrollerRef}
      >
        <div  className={styles.slide}>
          {Prod.map((p) => {
            return (
              <div key={p._id} className={styles.card} >
                <Card
                  prod={p}
                />
              </div>
            )
          })}
        </div>
      </div>
  )
}

export default Slider