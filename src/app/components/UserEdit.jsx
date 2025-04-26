"use client";
import { Codes, CountryCoder } from "@/CountryCodes";

import { useRouter } from "next/navigation";
import Uploader from "@/app/components/Uploader";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { MdVisibility } from "react-icons/md";
import {
  MdVisibilityOff,
  MdOutlineIncompleteCircle,
  MdOutlineToggleOn,
  MdOutlineToggleOff,
} from "react-icons/md";
import * as style from "@/app/Styles/index.module.css";

const UserEdit = ({ Updater, Use }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [pictureFile, setPictureFile] = useState();
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
  const [message, setMessage] = useState({
    error: "",
    success: "",
  });
  const [base64, setBase64] = useState("");

  const { _id, name, admin, email, address, countryCode, phone, picture } = Use;
  const [details, setDetails] = useState({
    name,
    email,
    address,
    phone,
    picture,
    countryCode,
    password: "",
    password2: "",
    admin,
  });

  const nameRegex = /^([A-Z])[a-z\d]{3,12}$/;
  const emailRegex = /^([a-z\d\.]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  const addressRegex = /^([A-Z])[a-zA-Z\d].{5,100}$/;
  const phoneRegex = /^\d{5,12}$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*].{8,20}$/;

  const handleSignout = () => {
    signOut({ redirect: false });
    router.push("/login");
  };

  const Netflix = async (formData) => {
    try {
      setLoading(true);
      setMessage({ ...message, error: "", success: "" });

      const { password, password2, email, name, address, phone } = details;

      if (name && !nameRegex.test(name)) {
        throw new Error(
          "Username must be alphanumeric,must have only the first charcter as caps, and must contain 5-12 characters"
        );
      }

      if (email && !emailRegex.test(email)) {
        throw new Error("Email must be a valid address e.g me@mydomain.com");
      }
      if (address && !addressRegex.test(address)) {
        throw new Error(
          "Address must be alphanumber betweeen 5-100 characters"
        );
      }
      if (phone && !phoneRegex.test(phone)) {
        throw new Error("Telephone must be number betweeen 5-12 characters");
      }
      if (password && !passRegex.test(password)) {
        throw new Error(
          "password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one special character !@#$%^&* and one digit"
        );
      }
      if (password !== password2) {
        throw new Error("Confirmation Failed");
      }

      const formData2 = new FormData();

      formData2.append("pictureFile", pictureFile);
      formData2.append("admin", details.admin);
      formData2.append("base64", base64);
      formData2.append("picture", picture);

      const response = await Updater(formData, formData2);

      if (response.ok) {
        console.log(response);
        setLoading(false);
        setMessage({ ...message, error: "" });
        setMessage({ ...message, success: response.message });
        setTimeout(() => {
          setMessage({ ...message, success: "" });

          if (
            session?.user.email === response.redirect ||
            response.redirect === ""
          ) {
            router.push(`/users/${session?.user.email}`);
          } else {
            handleSignout();
          }
        }, 3000);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setLoading(false);
      setMessage({ ...message, error: error.message });
      setTimeout(() => {
        setMessage({ ...message, error: "" });
      }, 3000);
    }
  };

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      name: "name",
      placeholder: details.name,
      label: "User Name",
      error: "Enter Name ",
      type: "text",
      pattern: `^[a-z\d].{5,12}$/i`,
    },
    {
      name: "email",
      placeholder: details.email,
      label: "Email",
      error: "enter valid email ",
      type: "text",
      pattern: `^([a-z\d\.]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$`,
    },
    {
      name: "address",
      placeholder: details.address,
      label: "Address",
      error: "enter valid address ",
      type: "text",
      pattern: `^[a-zA-Z0-9].{2,500}$`,
    },
    {
      name: "phone",
      placeholder: details.phone,
      label: "Phone No.",
      error: "enter valid number",
      type: "text",
      pattern: `^[0-9].{0,11}$`,
    },
    {
      name: "password",
      placeholder: details.password,
      label: "New Password",
      error:
        "password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one special character !@#$%^&* and one digit",
      type: pass.password,
      pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*].{8,20}$`,
    },
    {
      name: "password2",
      placeholder: details.password2,
      label: "Confirm Password",
      error: "Passwords don't match ",
      type: pass.password2,
      pattern: details.password,
    },
  ];

  return (
    <div className=" mx-10 lg:mx-28">
      <div className="my-5 flex justify-start rounded-md  text-white ">
        <p className="text-green-300 text-4xl font-bold">Update Profile</p>
      </div>

      <form
        className="grid w-full grid-cols-2 gap-10 lg:flex-row justify-between my-5 bg-[#121212] py-5 px-10  rounded-md"
        action={Netflix}
      >
        <div className="w-full col-span-2 lg:col-span-1 my-3 mr-10">
          <Uploader
            picture={picture ? picture : "/personHead.svg"}
            imagine="picture"
            setPictureFile={setPictureFile}
            base64={base64}
            setBase64={setBase64}
          />

          <input className="p-5" type="hidden" name="id" value={_id} />
        </div>

        <div className=" pb-5 w-full col-span-2 lg:col-span-1">
          {inputs.map((p) => {
            return (
              <div
                key={p.name}
                className=" grid grid-cols-6 my-5 items-center gap-5 relative h-fit"
              >
                <label className="capitalize col-span-2">{p.label}</label>
                <div className=" col-span-4">
                  {p.name !== "phone" && (
                    <input
                      className={`p-5 bg-black w-full text-gray-400 rounded-md col-span-5 ${style.input}`}
                      type={p.type}
                      name={p.name}
                      value={p.placeholder}
                      // pattern={p.pattern}
                      onChange={onChangeHandler}
                      // onBlur={(e) => {
                      //   setFocused({ ...focused, [e.target.name]: "true" });
                      // }}
                      // focused={focused[p.name]}
                    />
                  )}
                  {p.name === "phone" ? (
                    <div className="relative grid gap-3 grid-cols-6 w-full">
                      <select
                        className="p-5 col-span-2 bg-black text-gray-400  block rounded-md"
                        name="code"
                      >
                        <option value="">
                          {`${CountryCoder(countryCode)} : ${countryCode}`}
                        </option>
                        ;
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
                        className={`p-5 bg-black w-full text-gray-400 rounded-md col-span-4 ${style.input}`}
                        type={p.type}
                        name={p.name}
                        value={p.placeholder}
                        // pattern={p.pattern}
                        onChange={onChangeHandler}
                        // onBlur={(e) => {
                        //   setFocused({ ...focused, [e.target.name]: "true" });
                        // }}
                        // focused={focused[p.name]}
                      />
                    </div>
                  ) : null}
                  {(p.name === "password" || p.name === "password2") && (
                    <div
                      className="absolute right-0 top-[30%] flex items-center"
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
                  {details.admin ? (
                    <MdOutlineToggleOn />
                  ) : (
                    <MdOutlineToggleOff />
                  )}
                </div>
              </div>
            </div>
          )}
          {message.error !== "" && (
            <div className="text-red-500 border-2 my-2  border-red-500 border-solid p-5 w-full bg-red-300 rounded-md">
              {message.error}
            </div>
          )}
          {message.success !== "" && (
            <div className="text-green-500 border-2 my-2  border-green-500 border-solid p-5 w-full bg-green-300 rounded-md">
              {message.success}
            </div>
          )}

          <button className="w-full text-black bg-green-300 my-2  px-4 py-5 rounded-md hover:bg-green-600">
            {loading ? <MdOutlineIncompleteCircle /> : "update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
