"use client"
import { useContext, useState, useEffect } from 'react'
import  RecoveryContext  from '@/contextProvider/Recovery'
import Input from './Input'


const OTPInput = () => {
    const {email,  otp, setPage, setOtp } = useContext(RecoveryContext)
    const [timer, setTimer] = useState(60)
    const [disable, setDisable] = useState(true)
    const [border, setBorder] = useState("green-500")
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
        } else {
            setBorder("red-900")
        }
       
    }


    const SendOtp = async () => {
        const OTP = Math.floor(Math.random() * 9000 + 1000)
        setOtp(OTP)
        setDisable(true)
        console.log(email, "maillllll")
        
        const response = await fetch('/api/recovery', {
            method: "POST",
            body: JSON.stringify({
                OTP,
                recepient_Email: email
            })
        })

         
        console.log(response.ok, "ressssss")
        if (response.ok) {
            setDisable(true)
        }
         

    }
  
    return (
    <div  className='flex justify-center'>
        <div className='flex flex-col py-5 bg-white w-1/2 rounded-md justify-center items-center'>
                <h1
                    className='text-black text-2xl font-semibold'
                >
                    Enter OTP
                </h1>
                <form
                    onSubmit={CrossCheck}
                    className='flex  flex-col items-center'
                >
                    <div className='flex m-5 '>
                  {
                      ["one", "two", "three", "four"].map((name) => {
                          return (
                              <div className={`p-1 mx-1 rounded-md border-solid border-2 border-${border}`} key={name}>
                                  <Input setInput={setOTPInput} input={OTPInput}  name={name} />
                              </div>
                          )
                      
                      })
                  }
            </div>
                    <button
                        
                        className="my-2 py-1 px-3 rounded-md bg-green-500 text-black"
                    >
                        Confirm
                    </button>
          </form>

                <button
                    disabled={disable}
                    onClick={SendOtp}
                    className='btn btn-ghost text-black'
                >
                    {`Resend ${disable ? timer : ""}`}
                </button>
        </div>
    </div>
  )
}

export default OTPInput