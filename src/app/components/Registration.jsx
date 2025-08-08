"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import Modal from "@/app/components/Modal";
import SuccessMessage from "@/app/components/SuccessMessage";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useRouter } from "next/navigation";
import * as style from "@/app/Styles/index.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RegistrationContext } from "@/contextProvider/RegistrationContextProvider";

const Register = () => {
  const { page, setPage, setOtp, setEmail, data, setData } =
    useContext(RegistrationContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pass, setPass] = useState("password");

  const [error, setError] = useState();
  const [focused, setFocused] = useState({
    name: "false",
    email: "false",
    password: "false",
  });

  useEffect(() => {
    if (page === "complete") {
      AddUser();
    }
  }, [page]);
  const clear = () => {
    setIsError(false);
    setIsOpen(false);
    setError("");
    setSuccess("");
  };
  const AddUser = async () => {
    setIsLoading(true);
    setIsError(false);
    setIsOpen(false);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": " application/json",
        },
        body: JSON.stringify({ data }),
      });
      console.log(response, "responsidizer");
      if (!response.ok) {
        const res = await response.json();

        console.log({ res });
        throw new Error(res.message);
      }
      if (response.ok) {
        const res = await response.json();

        setSuccess(res.message);
        setIsOpen(true);
        setIsLoading(false);
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      }
    } catch (error) {
      console.log({ erorooo: error.message });
      setError(error.message);
      setIsError(true);
      setIsLoading(false);
      console.log(error, "error");
    }

    setTimeout(() => {
      clear();
    }, 10000);
  };

  const SendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //   const response = await fetch(`/api/recovery?search=${data.email}`);

      //   const result = await response.json();
      //   if (result) {
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

      setPage("otp");

      //   await AddUser();
      //   } else {
      //     throw new Error("Enter Valid Email");
      //   }
    } catch (error) {
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

  return (
    <>
      <div className="min-h-screen pt-32 w-screen flex justify-center text-white">
        <div className="w-full px-5 xxs:px-10 lg:px-28 md:w-2/3  my-5">
          <div className="my-5">
            <p className="text-green-300 text-center text-4xl font-extrabold">
              Register
            </p>
          </div>
          <form className="my-5 pb-5" onSubmit={SendOtp}>
            {[
              {
                name: "name",
                type: "text",
                error:
                  "username must not be less than 3 characters of more than 16 characters",
                pattern: `^[a-zA-Z0-9].{2,16}$`,
                focus: focused.name,
              },
              {
                name: "email",
                type: "email",
                error: "must be a valid email",
                pattern: `*@*\.com$`,
                focus: focused.email,
              },
              {
                name: "password",
                type: pass,
                error:
                  "password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one special character !@#$%^&* and one digit",
                pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*].{8,20}$`,
                focus: focused.password,
              },
              {
                name: "confirm password",
                type: pass,
                error: "must match password",
                pattern: data.password,
                focus: focused.password,
              },
            ].map((p) => {
              return (
                <div key={p.name} className="my-5 w-full relative">
                  <label className="capitalize text-green-300">
                    {p.name === "name" ? "username" : p.name}
                  </label>
                  <input
                    className={`p-5 text-gray-400 bg-[#121212] w-full rounded-md ${style.input}`}
                    type={p.type}
                    placeholder={p.name}
                    value={data[p.name]}
                    required={true}
                    pattern={p.pattern}
                    focused={p.focus}
                    onBlur={(e) => {
                      setFocused({ ...focused, [p.name]: "true" });
                    }}
                    onChange={(e) => {
                      setData({ ...data, [p.name]: e.target.value });
                    }}
                  />

                  {(p.name === "password" || p.name === "confirm password") && (
                    <div
                      className="absolute right-0 top-[50%] flex items-center mx-5"
                      onClick={(e) => {
                        shower(e);
                      }}
                    >
                      <span className=" p-2 rounded-full hover:bg-gray-800">
                        {!show ? <MdVisibility /> : <MdVisibilityOff />}
                      </span>
                    </div>
                  )}
                  <span className="text-red-500 border-2 my-2 border-red-500 border-solid py-2 px-5 bg-red-300 rounded-md hidden">
                    {p.error}
                  </span>
                </div>
              );
            })}

            {error !== "" ? (
              <Modal isOpen={isError} setIsOpen={setIsError}>
                <ErrorMessage error={error} />
              </Modal>
            ) : null}
            {success !== "" ? (
              <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <SuccessMessage success={success} />
              </Modal>
            ) : null}

            <button className="w-full bg-green-300 my-2 text-black p-5 rounded-lg hover:bg-green-600">
              <div className="flex justify-center items-center">
                {!isLoading ? (
                  "Register"
                ) : (
                  <AiOutlineLoading3Quarters className=" font-black text-2xl animate-spin" />
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
