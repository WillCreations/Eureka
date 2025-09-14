"use client";
import { useContext, useState, useEffect, useRef } from "react";
import RecoveryContext from "@/contextProvider/Recovery";
import Input from "./Input";
import SubHeader from "./SubHeader";
import Modal from "@/app/components/Modal";
import SuccessMessage from "@/app/components/SuccessMessage";
import ErrorMessage from "@/app/components/ErrorMessage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const OTPInput = ({ page, context }) => {
  const [isLoading, setIsLoading] = useState(false);
  const InputArrayRef = useRef([]);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { email, otp, setPage, setOtp } = useContext(context);
  const [timer, setTimer] = useState(60);
  const [disable, setDisable] = useState(true);
  const [border, setBorder] = useState("border-solid border-2 border-gray-100");

  const BoxNum = 4;
  const [OTPInput, setOTPInput] = useState(new Array(BoxNum).fill(""));

  // console.log(OTPInput, "OTPPPPP")

  // console.log(OTPInput.one + OTPInput.two + OTPInput.three + OTPInput.four, "Spread OTP");
  // const NewOTP = OTPInput.one + OTPInput.two + OTPInput.three + OTPInput.four;

  // console.log("old otp", otp, "new otp", NewOTP)
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prevTimer) => {
        prevTimer <= 1 && clearInterval(interval);
        if (prevTimer <= 1) setDisable(false);
        if (prevTimer <= 0) return prevTimer;
        return prevTimer - 1;
      });
    }, 1000);
  }, [disable]);

  const CrossCheck = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newOTP = OTPInput.join("");

    console.log({ otp, newOTP });
    if (otp.toString() === newOTP) {
      setBorder("border-solid border-2 border-green-500");
      setTimeout(() => {
        setIsOpen(true);
        setSuccess("OTP Confirmed");
        setIsLoading(false);
        setTimeout(() => {
          setIsOpen(false);
          setPage(page);
        }, 3000);
      }, 2000);
    } else {
      setBorder("border-solid border-2 border-red-900");
      setError("OTP Incorrect");
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
        setError("");
      }, 3000);
    }
  };

  useEffect(() => {
    InputArrayRef?.current[0].focus();
  }, []);

  const HandleChange = (e, index) => {
    if (isNaN(e.target.value)) return;
    const value = e.target.value.trim();
    let newInput = OTPInput;
    let newInputt = OTPInput;
    newInput[index] = value.substring(1 - 1);
    newInputt[index] = value.slice(-1);
    console.log({ stringCheck: newInput[index] });
    console.log({ sliceCheck: newInputt[index] });
    setOTPInput([...newInput]);
    if (index + 1 < BoxNum && newInput[index]) {
      InputArrayRef.current[index + 1].focus();
    }
  };

  const HandleKeyDown = (e, index) => {
    const currentInput = OTPInput;
    if (!currentInput[index] && e.key === "Backspace" && index - 1 >= 0) {
      InputArrayRef.current[index - 1].focus();
    }
  };
  const SendOtp = async () => {
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    setOtp(OTP);
    setTimer(60);
    setDisable((prev) => {
      if (prev === false) return !prev;
    });

    console.log(email, "maillllll");

    const response = await fetch("/api/recovery", {
      method: "POST",
      body: JSON.stringify({
        OTP,
        recepient_Email: email,
        subject: "OTP Refresh",
        stats: "resend",
      }),
    });

    console.log(response.ok, "ressssss");
    if (response.ok) {
      setDisable(true);
    }
  };

  return (
    <div className=" px-5 xxs:px-10 lg:px-28 h-screen ">
      <SubHeader tag="Enter OTP" />
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 gap-5 py-5 px-5 bg-[#121212] w-full md:w-2/3 lg:w-2/5 my-auto rounded-2xl justify-center items-center">
          <form onSubmit={CrossCheck} className="grid grid-cols-1 gap-5">
            <div className="grid grid-cols-4 gap-1 xxs:gap-5">
              {OTPInput.map((input, index) => {
                return (
                  <div className={`p-1 mx-1 rounded-2xl ${border}`} key={index}>
                    <input
                      className="rounded-2xl w-full text-gray-300 bg-black py-5 text-center px-3"
                      name={input}
                      value={OTPInput[index]}
                      type="text"
                      ref={(input) => {
                        InputArrayRef.current[index] = input;
                      }}
                      onChange={(e) => {
                        HandleChange(e, index);
                      }}
                      onKeyDown={(e) => {
                        HandleKeyDown(e, index);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <button className="my-2 py-5 px-5 w-full rounded-2xl  bg-green-300 text-black">
              <div className="flex justify-center items-center">
                {!isLoading ? (
                  "Confirm"
                ) : (
                  <AiOutlineLoading3Quarters className=" font-black text-2xl animate-spin" />
                )}
              </div>
            </button>
            {success ? (
              <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <SuccessMessage success={success} />
              </Modal>
            ) : null}
            {error ? (
              <Modal isOpen={isError} setIsOpen={setIsError}>
                <ErrorMessage error={error} />
              </Modal>
            ) : null}
          </form>
          <button
            disabled={disable}
            onClick={SendOtp}
            className="px-10 w-full disabled:text-gray-300 disabled:bg-gray-400 py-5 rounded-2xl bg-black text-green-300"
          >
            {`Resend ${disable ? timer : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
