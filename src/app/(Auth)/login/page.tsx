"use client"
import { useState, createContext, useEffect } from 'react'
import Login from '@/app/components/Login';
import OTPInput from '@/app/components/OTPInput';
import Reset from '@/app/components/Reset';
import Recovered from '@/app/components/Recovered';
 

const RecoveryContext = createContext({
    page: "",
    setPage: (prev) => { },
    otp: "",
    setOtp: (prev) => { },
    email: "",
    setEmail: (prev) => { }
});



export const Forgot = () => {
    const [page, setPage] = useState("Login");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState();


    const Navigator = () => {
        if (page === "Login") return <Login />;
        if (page === "otp") return <OTPInput />;
        if (page === "Reset") return <Reset/>;
        return <Recovered/> 
    }

    const context = {
        page,
        setPage,
        otp,
        setOtp,
        email,
        setEmail
    }

  return (
      <RecoveryContext.Provider value={context} >
        <div className='flex justify-center pt-32 items-center'>
            <Navigator />
        </div>
      </RecoveryContext.Provider >
  )
}


export default RecoveryContext