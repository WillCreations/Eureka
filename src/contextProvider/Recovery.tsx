
"use client"
import { useState, createContext} from 'react'



const RecoveryContext = createContext({
    page: "",
    setPage: (prev) => { },
    otp: "",
    setOtp: (prev) => { },
    email: "",
    setEmail: (prev) => { }
});

export const ForgotProvider = ({children}) => {
    const [page, setPage] = useState("Login");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState();


  

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
        {children}
      </RecoveryContext.Provider >
  )
}


export default RecoveryContext