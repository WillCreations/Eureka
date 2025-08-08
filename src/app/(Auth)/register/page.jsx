"use client";
import React, { useContext } from "react";
import Registration from "@/app/components/Registration";
import { RegistrationContext } from "@/contextProvider/RegistrationContextProvider";
import RegistrationContextProvider from "@/contextProvider/RegistrationContextProvider";
import OTPInput from "@/app/components/OTPInput";

const page = () => {
  const Navigator = () => {
    const Context = useContext(RegistrationContext);
    const { page } = Context;

    if (page === "register") return <Registration />;
    if (page === "otp") return <OTPInput page={"complete"} context={RegistrationContext} />;
    if (page === "complete") return <Registration />;
  };
  return (
    <RegistrationContextProvider>
      <Navigator />
    </RegistrationContextProvider>
  );
};

export default page;
