"use client";
import React, { useState, createContext } from "react";

export const RegistrationContext = createContext({});

const RegistrationContextProvider = ({ children }) => {
  const [page, setPage] = useState("register");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = {
    page,
    setPage,
    otp,
    setOtp,
    email,
    setEmail,
    data,
    setData,
  };
  return (
    <RegistrationContext.Provider value={context}>
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationContextProvider;
