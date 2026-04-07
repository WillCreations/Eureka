"use client";
import { Codes, CountryCoder } from "@/CountryCodes";
import Modal from "./Modal";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
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
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UserEdit = ({ Updater, Use, deleteImage }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const [base64, setBase64] = useState("");

  const {
    _id,
    name,
    admin,
    email,
    address,
    countryCode,
    phone,
    picture,
    image,
    destroy,
  } = Use;
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

  const DeleteObj = {
    id: _id,
    fsUnlink: image,
    cloudDestroy: destroy,
    itemType: "user",
    Action: deleteImage,
  };

  // Name: Start with letter (uppercase), 4-20 chars, letters and digits only
  const nameRegex = /^[A-Z][a-zA-Z0-9]{3,19}$/;
  // Email: RFC 5321 compliant, prevents consecutive dots and invalid patterns
  const emailRegex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
  // Address: Start with uppercase, 6-100 chars, letters, digits, spaces, commas, periods, hyphens, apostrophes, hash
  const addressRegex = /^[A-Z][a-zA-Z0-9\s,.#'-]{5,99}$/;
  // Phone: 5-12 digits only (international format compatible)
  const phoneRegex = /^\d{5,12}$/;
  // Password: 8-20 chars, min one uppercase, one lowercase, one digit, one special (!@#$%^&*)
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;

  const handleSignout = () => {
    signOut({ redirect: false });
    router.push("/login");
  };

  const clear = () => {
    document.body.style.overflow = "auto";
    setSuccess("");
    setError("");
    setBase64("");
  };

  const Netflix = async (formData) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        setError("");
        setSuccess("");

        const { password, password2, email, name, address, phone } = details;
        let errorMsg = "";
        if (name && !nameRegex.test(name)) {
          errorMsg =
            "Username must start with an uppercase letter, 4-20 characters, containing only letters and digits.";
        } else if (email && !emailRegex.test(email)) {
          errorMsg =
            "Email format invalid. Use format like: user@example.com";
        } else if (address && !addressRegex.test(address)) {
          errorMsg =
            "Address must start with uppercase letter, 6-100 characters (letters, numbers, spaces, commas, periods, hyphens, apostrophes, #).";
        } else if (phone && !phoneRegex.test(phone)) {
          errorMsg =
            "Phone must contain 5-12 digits only.";
        } else if (password && !passRegex.test(password)) {
          errorMsg =
            "Password: 8-20 chars minimum, with at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).";
        } else if (password !== password2) {
          errorMsg = "Passwords do not match.";
        }

        if (errorMsg) {
          setIsLoading(false);
          setError(errorMsg);
          setIsError(true);
          document.body.style.overflow = "hidden";
          setTimeout(() => {
            clear();
          }, 5000);
          return;
        }

        const formData2 = new FormData();
        formData2.append("pictureFile", pictureFile);
        formData2.append("admin", details.admin);
        formData2.append("base64", base64);
        formData2.append("picture", picture);

        const response = await Updater(formData, formData2);

        if (response.ok) {
          console.log(response);
          setIsLoading(false);
          setIsOpen(true);
          setSuccess(response.message);
          document.body.style.overflow = "hidden";
          setTimeout(() => {
            clear();

            if (
              session?.user.email === response.redirect ||
              response.redirect === ""
            ) {
              router.push(`/users/${session?.user.email}`);
            } else if (
              session?.user.email !== response.redirect &&
              session?.user.admin === true
            ) {
              router.push(`/users/${response.redirect}`);
            } else {
              handleSignout();
            }
          }, 3000);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        setIsError(true);
        document.body.style.overflow = "hidden";
        setTimeout(() => {
          clear();
        }, 5000);
      }
    }, 5000);
  };

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      name: "name",
      placeholder: details.name,
      label: "User Name",
      error: "Username must start with uppercase letter, 4-20 characters, letters and digits only",
      type: "text",
      pattern: `^[A-Z][a-zA-Z0-9]{3,19}$`,
    },
    {
      name: "email",
      placeholder: details.email,
      label: "Email",
      error: "Email must be valid format (e.g., user@example.com)",
      type: "text",
      pattern: `^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\\.[a-zA-Z]{2,}$`,
    },
    {
      name: "address",
      placeholder: details.address,
      label: "Address",
      error: "Address must start with uppercase, 6-100 characters including letters, numbers, spaces, commas, periods, hyphens, apostrophes",
      type: "text",
      pattern: `^[A-Z][a-zA-Z0-9\\s,.#'-]{5,99}$`,
    },
    {
      name: "phone",
      placeholder: details.phone,
      label: "Phone No.",
      error: "Phone must be 5-12 digits only",
      type: "text",
      pattern: `^\\d{5,12}$`,
    },
    {
      name: "password",
      placeholder: details.password,
      label: "New Password",
      error:
        "Password must be 8-20 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)",
      type: pass.password,
      pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$`,
    },
    {
      name: "password2",
      placeholder: details.password2,
      label: "Confirm Password",
      error: "Passwords must match",
      type: pass.password2,
      pattern: details.password,
    },
  ];

  return (
    <div className=" mx-5 xxs:mx-10 lg:mx-28">
      <div className="my-5 flex justify-start rounded-md  text-white ">
        <p className="text-green-300 text-4xl font-bold">Update Profile</p>
      </div>

      <form
        className="grid w-full text-gray-300 grid-cols-2 gap-10 lg:flex-row justify-between my-5 bg-[#121212] py-5 px-5 xxs:px-10  rounded-2xl"
        action={Netflix}
      >
        <div className="w-full col-span-2 lg:col-span-1 xxs:my-3 xxs:mr-10">
          <Uploader
            picture={picture ? picture : "/personHead.svg"}
            imagine="picture"
            setPictureFile={setPictureFile}
            base64={base64}
            setBase64={setBase64}
            DeleteObj={DeleteObj}
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
                <label className="capitalize col-span-6 sm:col-span-2">
                  {p.label}
                </label>
                <div className=" col-span-6 sm:col-span-4">
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
                      className="absolute right-0 top-[55%] sm:top-[30%] flex items-center"
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
            className="w-full text-black bg-green-300 my-2  px-4 py-5 rounded-2xl "
          >
            <div className="flex justify-center items-center">
              {!isLoading ? (
                "Update User"
              ) : (
                <AiOutlineLoading3Quarters className=" text-black text-2xl animate-spin" />
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
