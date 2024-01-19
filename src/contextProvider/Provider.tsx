"use client"
import { SessionProvider } from "next-auth/react"

const Provider = ({ children, session }: {
  children: any,
  session: {
    expires: string,
    user: {
      email: string,
      name: string,
      phone: string
   }
  
}}) => {

   return (
    <SessionProvider session={session}>
          {children}
    </SessionProvider>
  )
}

export default Provider