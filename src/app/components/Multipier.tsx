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
      <div className='flex flex-col justify-between mt-5'>
          <div>
              <button disabled={!disabler && true}  className='btn btn-success rounded-l-btn ' onClick={() => { HandleReducer() }}>-</button>
              <span className="px-5">{stock}</span>
              <button disabled={!disabler && true} className='btn btn-success rounded-r-btn' onClick={() => { HandleIncrease() }}>+</button>
          </div>
          <div  className='text-2xl mt-5'>Sum: ${feedback}</div>
          
    </div>
  )
}

export default Multipier