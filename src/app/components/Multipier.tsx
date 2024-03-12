"use Client"
import  {useState, useEffect} from 'react'

const Multipier = ({ SingleProd, Quant, disabler }) => {
    const {price, stock} = SingleProd
    const [feedback, setFeedback] = useState(price)
    
   
    
    
    const HandleReducer = () => {
        Quant(SingleProd, "Dec")
        
    }

    
    const HandleIncrease = () => {
       
        Quant(SingleProd, "Inc")
       
     
    }
 
    
    useEffect(() => {
        const update = () => {
            setFeedback(() => {
                console.log(stock, price, "new multiples")
                const one = stock * price
                return one 
            })
        }

        update()
        
     }, [stock])   



  return (
      <div className='flex flex-col justify-between '>
          <div className='flex items-center '>
              <button disabled={!disabler && true}  className="bg-yellow-500 text-black px-5 py-3 disabled:bg-gray-200 disabled:text-gray-300  rounded-l-btn" onClick={() => { HandleReducer() }}>-</button>
              <span className="px-5">{stock}</span>
              <button disabled={!disabler && true} className="bg-yellow-500 text-black px-5 py-3 disabled:bg-gray-200 disabled:text-gray-300   rounded-r-btn" onClick={() => { HandleIncrease() }}>+</button>
          </div>
          <div  className='text-xl mt-5'>Sum: <span className="text-green-500  text-2xl font-bold">${feedback}</span></div>
          
    </div>
  )
}

export default Multipier