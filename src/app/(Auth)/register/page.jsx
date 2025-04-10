"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useRouter } from "next/navigation";
import * as style from "@/app/Styles/index.module.css";

const Register = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pass, setPass] = useState("password");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [focused, setFocused] = useState({
    name: "false",
    email: "false",
    password: "false",
  });

  const AddUser = async (e) => {
    e.preventDefault();
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
        const data = await response.json();
        setError(data.error);
        console.log(data);
      }
      if (response.ok) {
        const userinfo = await response.json();
        console.log(userinfo, "userinfo");
        setShowing(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error) {
      setError("email already exists");
      console.log(error, "error");
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
        <div className="w-2/3 md:w-2/5 my-5">
          <div className="my-5">
            <p className="text-green-300 text-center text-4xl font-extrabold">
              Register
            </p>
          </div>
          <form className="my-5 pb-5" onSubmit={AddUser}>
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

                  <span className="text-red-500 border-2 my-2 border-red-500 border-solid py-2 px-5 bg-red-300 rounded-md hidden">
                    {p.error}
                  </span>
                  {(p.name === "password" || p.name === "confirm password") && (
                    <div
                      className="absolute right-0 top-1/2 flex items-center mx-5"
                      onClick={(e) => {
                        shower(e);
                      }}
                    >
                      <span className=" p-2 rounded-full hover:bg-gray-800">
                        {!show ? <MdVisibility /> : <MdVisibilityOff />}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            <div
              className={`flex flex-col align-center  ${
                showing || error ? "justify-between" : "justify-end"
              } items-center`}
            >
              {showing ? (
                <div className="text-green-600  border-2 border-green-600 border-solid py-5 px-5 w-full bg-green-300 rounded-md">
                  <p className="text-center w-full">Registeration Successful</p>
                </div>
              ) : null}

              {error && (
                <div>
                  <span className="text-red-500 border-2 my-2 border-red-500 border-solid py-5 px-5 w-full bg-red-300 rounded-md ">
                    {error}
                  </span>
                </div>
              )}
              <button className="w-full bg-green-300 my-2 text-black p-5 rounded-lg hover:bg-green-600">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
