"use client";
import { useContext, useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useRouter } from "next/navigation";
import { signIn, getProviders, useSession } from "next-auth/react";
import Link from "next/link";
import RecoveryContext from "@/contextProvider/Recovery";
import { off } from "process";

const Login = ({ setEmail }) => {
  const router = useRouter();
  const Provider = getProviders();
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState({
    email: "",
    password: "",
  });
  const [border, setBorder] = useState({
    email: "",
    password: "",
  });
  const [pass, setPass] = useState("password");
  const { data: session } = useSession();
  const { setPage, setOtp } = useContext(RecoveryContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  console.log(session, "pre session in login");

  const Logger = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/recovery?search=${data.email}`);
    const result = await response.json();

    if (result) {
      const log = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!log.ok) {
        setShowing(false);
        setMessage({ ...message, password: "Incorrect Password", email: "" });
        setBorder({
          ...border,
          password: "border-solid border-2 border-red-500",
          email: "",
        });
      } else {
        console.log(log.ok, "log is ok");
        setMessage({ ...message, password: "" });
        setBorder({ ...border, password: "" });
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } else {
      setShowing(true);
      setMessage({ ...message, email: "Enter Valid Email" });
      setBorder({ ...border, email: "border-solid border-2 border-red-500" });
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
      setMessage({ ...message, email: "Enter Valid Email" });
      setBorder({ ...border, email: "border-solid border-2 border-red-500" });
    }
  };

  return (
    <div className="flex w-screen justify-center">
      <div className="w-2/3 md:w-2/5 my-5">
        <div className="my-5">
          <div className="my-5">
            <p className="text-green-500 text-center text-2xl font-extrabold">
              Login
            </p>
          </div>
          <button
            className="btn btn-primary w-full rounded-md"
            onClick={() => {
              signIn("google");
            }}
          >
            Signin with Google
          </button>
        </div>
        <form className="my-5 pb-5" onSubmit={Logger}>
          <div className="my-5 w-full">
            <label>Email</label>
            <input
              className={`p-5 w-full rounded-md ${border.email}`}
              type="text"
              placeholder="@example.com"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
            {message.email !== "" && (
              <p className="text-red-500 border-2 my-2 border-red-500 border-solid py-2 px-5 bg-red-300 rounded-md">
                {message.email}
              </p>
            )}
          </div>
          <div className="mt-5 w-full relative">
            <label>Password</label>
            <input
              className={`p-5 w-full rounded-md ${border.password}`}
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
          {message.password !== "" ? (
            <div className="text-red-500 mt-2 border-2 border-red-500 border-solid py-2 px-5 bg-red-300 rounded-md ">
              <span>{message.password}</span>
            </div>
          ) : null}
          <div onClick={SendOtp} className="text-blue-500 mt-5 cursor-pointer">
            Forgot password?
          </div>
          <div
            className={`flex align-center  ${
              showing || success ? "justify-between" : "justify-end"
            } items-center`}
          >
            {showing ? (
              <div className="text-red-500 border-2 border-red-500 border-solid py-2 px-5 bg-red-300 rounded-md ">
                <p>
                  <span> or please </span>
                  <Link href="/register">
                    <span className="text-blue-500 underline">Register</span>
                  </Link>
                  <span> User</span>
                </p>
              </div>
            ) : null}

            {success ? (
              <div>
                <p className="text-green-600  border-2 border-green-600 border-solid py-2 px-5 bg-green-300 rounded-md">
                  Login Successful
                </p>
              </div>
            ) : null}

            <button className="float-right bg-green-500 my-2 text-white px-4 py-2 ml-4 rounded hover:bg-green-600">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
