"use client";
import { Codes } from "@/CountryCodes";
import Uploader from "@/app/components/Uploader";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  MdVisibility,
  MdVisibilityOff,
  MdOutlineToggleOn,
  MdOutlineToggleOff,
} from "react-icons/md";
import * as style from "@/app/Styles/index.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from "./Modal";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";

const UserForm = ({ Action, button }) => {
  const { data: session } = useSession();
  const [pictureFile, setPictureFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState({
    password: false,
    password2: false,
  });
  const [focused, setFocused] = useState({
    name: "false",
    email: "false",
    address: "false",
    phone: "false",
    picture: "false",
    password: "false",
    password2: "false",
  });
  const [pass, setPass] = useState({
    password: "password",
    password2: "password",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [base64, setBase64] = useState("");

  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    picture: "",
    password: "",
    password2: "",
    admin: false,
  });

  const clear = () => {
    document.body.style.overflow = "auto";
    setSuccess("");
    setError("");
    setBase64("");
    setDetails({
      name: "",
      email: "",
      address: "",
      phone: "",
      picture: "",
      password: "",
      password2: "",
      admin: false,
    });
  };
  const Netflix = async (formData) => {
    setIsLoading(true);
    setSuccess("");
    setError("");
    setTimeout(async () => {
      try {
        console.log(formData, "onSubmit");
        const formData2 = new FormData();
        formData2.append("pictureFile", pictureFile);
        formData2.append("admin", details.admin);
        formData2.append("base64", base64);
        const response = await Action(formData, formData2);

        if (response.ok) {
          setIsLoading(false);
          setSuccess(response.message);
          setIsOpen(true);
          document.body.style.overflow = "hidden";
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setError(error.message);
        document.body.style.overflow = "hidden";
        console.log("error: ", error.message);
      }

      setTimeout(() => {
        clear();
      }, 10000);
    }, 5000);
  };

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      name: "name",
      placeholder: "Enter Username...",
      value: details.name,
      label: "Username",
      error: "Enter Name ",
      type: "text",
      pattern: `^[a-zA-Z0-9].{2,16}$`,
    },
    {
      name: "email",
      placeholder: "Enter Email...",
      value: details.email,
      label: "Email",
      error: "enter valid email ",
      type: "text",
      pattern: `*@*\.com$`,
    },
    {
      name: "address",
      placeholder: "Enter Address...",
      value: details.address,
      label: "Address",
      error: "enter valid address ",
      type: "text",
      pattern: `^[a-zA-Z0-9].{2,500}$`,
    },
    {
      name: "phone",
      placeholder: "Enter Phone Number...",
      value: details.phone,
      label: "Phone No.",
      error: "enter valid number",
      type: "text",
      pattern: `^[0-9].{0,11}$`,
    },
    {
      name: "password",
      placeholder: "Enter Password...",
      value: details.password,
      label: "Password",
      error:
        "password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one special character !@#$%^&* and one digit",
      type: pass.password,
      pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*].{8,20}$`,
    },
    {
      name: "password2",
      placeholder: "Confirm Password...",
      value: details.password2,
      label: "Confirm Password",
      error: "Passwords don't match ",
      type: pass.password2,
      pattern: details.password,
    },
  ];

  return (
    <form
      className="grid w-full grid-cols-2 text-gray-300 gap-10 lg:flex-row justify-between my-5 bg-[#121212] py-5 px-5 xxs:px-10 rounded-2xl"
      action={Netflix}
    >
      <Uploader
        picture="/personHead.svg"
        imagine="picture"
        setPictureFile={setPictureFile}
        base64={base64}
        setBase64={setBase64}
      />
      <div className=" pb-5 w-full col-span-2 lg:col-span-1">
        {inputs.map((p) => {
          return (
            <div
              key={p.name}
              className=" grid grid-cols-6 my-5 items-center gap-2 xxs:gap-5 relative h-fit"
            >
              <label className="capitalize col-span-6 xxs:col-span-2">
                {p.label}
              </label>
              <div className="col-span-6 sm:col-span-4">
                {p.name !== "phone" && (
                  <input
                    className={`p-5 bg-black w-full text-gray-300 rounded-md col-span-5 ${style.input}`}
                    type={p.type}
                    name={p.name}
                    value={p.value}
                    placeholder={p.placeholder}
                    pattern={p.pattern}
                    onChange={onChangeHandler}
                    onBlur={(e) => {
                      setFocused({ ...focused, [e.target.name]: "true" });
                    }}
                    focused={focused[p.name]}
                  />
                )}
                {p.name === "phone" ? (
                  <div className="relative grid gap-3 grid-cols-6 w-full">
                    <select
                      className="p-5 col-span-6 sm:col-span-2 bg-black text-gray-400  block rounded-md"
                      name="code"
                    >
                      <option value="">Country Code</option>;
                      {Codes?.map((opt, index) => {
                        return (
                          <option
                            key={index}
                            value={opt?.dial_code}
                          >{`${opt?.name} : ${opt?.dial_code}`}</option>
                        );
                      })}
                    </select>
                    <input
                      className={`p-5 bg-black w-full text-gray-300 rounded-md col-span-6 sm:col-span-4 ${style.input}`}
                      type={p.type}
                      name={p.name}
                      value={p.value}
                      placeholder={p.placeholder}
                      pattern={p.pattern}
                      onChange={onChangeHandler}
                      onBlur={(e) => {
                        setFocused({ ...focused, [e.target.name]: "true" });
                      }}
                      focused={focused[p.name]}
                    />
                  </div>
                ) : null}

                {(p.name === "password" || p.name === "password2") && (
                  <div
                    className="absolute right-0 top-[55%] xxs:top-[30%] flex items-center"
                    onClick={(e) => {
                      if (!show[p.name]) {
                        setShow({ ...show, [p.name]: true });
                        setPass({ ...pass, [p.name]: "text" });
                      } else {
                        setShow({ ...show, [p.name]: false });
                        setPass({ ...pass, [p.name]: "password" });
                      }
                    }}
                  >
                    <span className=" mx-5 p-2 rounded-full text-white hover:bg-gray-800">
                      {!show[p.name] ? <MdVisibility /> : <MdVisibilityOff />}
                    </span>
                  </div>
                )}
                <span className="text-red-500 border-2 my-2 h-40 border-red-500 border-solid py-2 px-5 bg-red-300 rounded-md hidden ">
                  {p.error}
                </span>
              </div>
            </div>
          );
        })}

        {session?.user.admin && (
          <div className=" grid grid-cols-6 my-5 justify-center items-center gap-5 relative h-fit">
            <label className="capitalize col-span-2">Admin</label>
            <div className=" col-span-4">
              <div
                onClick={() => {
                  setDetails({ ...details, admin: !details.admin });
                }}
                className={`text-6xl ${
                  details.admin ? "text-green-300" : "text-gray-500"
                }   `}
              >
                {details.admin ? <MdOutlineToggleOn /> : <MdOutlineToggleOff />}
              </div>
            </div>
          </div>
        )}

        {success && (
          <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
            <SuccessMessage success={success} />{" "}
          </Modal>
        )}
        {error && (
          <Modal setIsOpen={setIsError} isOpen={isError}>
            <ErrorMessage error={error} />{" "}
          </Modal>
        )}
        <button
          disabled={isLoading}
          className="w-full text-black bg-green-300 my-2  px-4 py-5 rounded-2xl"
        >
          <div className="flex justify-center items-center">
            {!isLoading ? (
              "Register New User"
            ) : (
              <AiOutlineLoading3Quarters className=" text-black text-2xl animate-spin" />
            )}
          </div>
        </button>
      </div>
    </form>
  );
};

export default UserForm;
