"use client"
import {  useContext} from 'react'
import Login from '@/app/components/Login';
import OTPInput from '@/app/components/OTPInput';
import Reset from '@/app/components/Reset';
import Recovered from '@/app/components/Recovered';
import {ForgotProvider} from '@/contextProvider/Recovery';
import RecoveryContext from "@/contextProvider/Recovery"


const Forgot = () => {

    const Navigator = () => {
    const Contex = useContext(RecoveryContext)
    const {page, setEmail} = Contex

        if (page === "Login") return <Login setEmail={setEmail} />;
        if (page === "otp") return <OTPInput />;
        if (page === "Reset") return <Reset/>;
        return <Recovered/> 

    }

    return ( 
        <div className='pt-32'>
        <ForgotProvider>
            <Navigator/>
        </ForgotProvider >
        </div>
    )
}


export default Forgot