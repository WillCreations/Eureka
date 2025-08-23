"use client";
import { useContext, useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useRouter } from "next/navigation";
import { signIn, getProviders, useSession } from "next-auth/react";
import Link from "next/link";
import RecoveryContext from "@/contextProvider/Recovery";
import { off } from "process";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from "@/app/components/Modal";
import SuccessMessage from "@/app/components/SuccessMessage";
import ErrorMessage from "@/app/components/ErrorMessage";
import ConfirmComp from "./ConfirmComp";

const Login = ({ setEmail }) => {
  const router = useRouter();
  const Provider = getProviders();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [pass, setPass] = useState("password");
  const { data: session } = useSession();
  const { setPage, setOtp } = useContext(RecoveryContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  console.log(session, "pre session in login");
  const clearPassError = () => {
    setPasswordError(false);
    setIsError(false);
    setError("");
  };
  const clearEmailError = () => {
    setEmailError(false);
    setIsError(false);
    setError("");
  };
  const Logger = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!data.email) {
        throw new Error("Enter email");
      }
      if (!data.password) {
        throw new Error("Enter password");
      }
      const response = await fetch(`/api/recovery?search=${data.email}`);
      const result = await response.json();
      console.log({ response: response.ok });

      if (!result) {
        setEmailError(true);
        throw new Error(
          `User with email ${data.email} not found please Register`
        );
      }
      if (response.ok) {
        const log = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (!log.ok) {
          setPasswordError(true);
          throw new Error("Incorrect password");
        } else {
          console.log(log.ok, "log is ok");

          setSuccess(`${result.name} signed in successfully`);
          setIsOpen(true);

          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      setIsError(true);
    }
  };

  const shower = (e) => {
    e.preventDefault();
    if (!show) {
      setShow(true);
      setPass("text");
    } else {
      setShow(false);
      setPass("password");
    }
  };

  const SendOtp = async () => {
    try {
      const response = await fetch(`/api/recovery?search=${data.email}`);

      const result = await response.json();
      if (result) {
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        setOtp(OTP);
        setEmail(data.email);
        const response = await fetch("/api/recovery", {
          method: "POST",
          body: JSON.stringify({
            OTP,
            recepient_Email: data.email,
          }),
        });

        setPage((prev) => {
          return "otp";
        });
      } else {
        throw new Error("Enter Valid Email");
      }
    } catch (error) {
      setError(error.message);
      setIsError(true);
    }
  };

  const RegisterUser = () => {
    router.push("/register");
  };

  return (
    <div className="flex w-screen justify-center items-center">
      <div className="px-5 xxs:px-10 lg:px-28 w-full sm:w-2/3 md:w-2/4  xl:w-2/5 my-5">
        <div className="my-5">
          <div className="my-5">
            <p className="text-green-300 text-center text-4xl font-extrabold">
              Login
            </p>
          </div>
          <button
            className="bg-[#3b3b3b] text-gray-300 py-5 w-full rounded-lg"
            onClick={() => {
              signIn("google");
            }}
          >
            Signin with Google
          </button>
        </div>
        <form className="my-5 pb-5" onSubmit={Logger}>
          <div className="my-5 w-full">
            <label className="text-green-300">Email</label>
            <input
              className={`p-5 w-full text-gray-400 bg-[#121212] rounded-md `}
              type="text"
              placeholder="@example.com"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
          </div>
          <div className="mt-5 w-full relative">
            <label className="text-green-300">Password</label>
            <input
              className={`p-5 w-full text-gray-400 bg-[#121212] rounded-md `}
              type={`${pass}`}
              placeholder="Password"
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />

            <div
              className="absolute right-0 top-1/2 mx-5 p-2 rounded-full hover:bg-gray-800"
              onClick={(e) => {
                shower(e);
              }}
            >
              {!show ? <MdVisibility /> : <MdVisibilityOff />}
            </div>
          </div>

          {error ? (
            <Modal isOpen={isError} setIsOpen={setIsError}>
              <div className="flex flex-col gap-5 justify-center items-center">
                <ErrorMessage error={error} />
                {passwordError && (
                  <ConfirmComp
                    item={"recover your password"}
                    setConfirm={clearPassError}
                    Action={SendOtp}
                  />
                )}
                {emailError && (
                  <ConfirmComp
                    item={"register a new user"}
                    setConfirm={clearEmailError}
                    Action={RegisterUser}
                  />
                )}
              </div>
            </Modal>
          ) : null}

          {success ? (
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
              <SuccessMessage success={success} />
            </Modal>
          ) : null}

          <button className="w-full bg-green-300 my-5 text-black px-4 py-5  rounded-lg ">
            <div className="flex justify-center items-center">
              {!isLoading ? (
                "Login"
              ) : (
                <AiOutlineLoading3Quarters className=" font-black text-2xl animate-spin" />
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
