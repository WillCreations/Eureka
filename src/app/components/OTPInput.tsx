"use client"
import { useContext, useState, useEffect } from 'react'
import  RecoveryContext  from '../(Auth)/login/page'
import Input from './Input'


const OTPInput = () => {
    const { email, otp, setPage } = useContext(RecoveryContext)
    const [timer, setTimer] = useState(60)
    const [disable, setDisable] = useState(true)
    const [OTPInput, setOTPInput] = useState({
        one: "",
        two: "",
        three: "",
        four: ""
    })

    // console.log(OTPInput, "OTPPPPP")
    
    // console.log(OTPInput.one + OTPInput.two + OTPInput.three + OTPInput.four, "Spread OTP");
    const NewOTP = OTPInput.one + OTPInput.two + OTPInput.three + OTPInput.four

    // console.log("old otp", otp, "new otp", NewOTP)
    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((prevTimer) => { 
                prevTimer <= 1 && clearInterval(interval);
                if (prevTimer <= 1) setDisable(false);
                if (prevTimer <= 0) return prevTimer;
                return prevTimer - 1;

            })
        }, 1000)
    }, [disable])
    
   
    const CrossCheck = (e) => {
        e.preventDefault()

        if (otp.toString() === NewOTP) {
          setPage("Reset")  
        }
        

    }
  
  return (
    <div className='flex flex-col py-5 bg-white w-1/2 rounded-md justify-center items-center'>
          <h1 className='text-black text-2xl font-semibold'>Enter OTP</h1>
          <form onSubmit={CrossCheck} className='flex  flex-col items-center'>
              <div className='flex m-5'>
                  {
                      ["one", "two", "three", "four"].map((name) => {
                          return (
                              <div key={name}>
                                  <Input setInput={setOTPInput} input={OTPInput}  name={name} />
                              </div>
                          )
                      
                      })
                  }
            </div>
              <button className="my-2 py-1 px-3 rounded-md bg-green-500 text-black">Reset</button>
          </form>


    </div>
  )
}

export default OTPInput