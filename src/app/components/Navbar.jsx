"use client";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCartShopping, FaBars } from "react-icons/fa6";
import ProductCart from "../../contextProvider/Prod";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import * as styles from "@/app/Styles/index.module.css";

const Navbar = () => {
  const [touch, setTouch] = useState("hidden");
  const [cartIcon, setCartIcon] = useState(<FaCartShopping />);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState();

  const Pixel = async () => {
    const response = await fetch(`/api/user?search=${session?.user.name}`);
    const data = await response.json();
    console.log(data, "da da da ta");
    setUser(data);
  };

  useEffect(() => {
    Pixel();
  }, [session]);

  const parallax = useContext(ProductCart);
  const Num = parallax.CartNumber;

  const Toggler = () => {
    if (!isOpen) {
      setCartIcon(`Cart`);
      setIsOpen(true);
    } else {
      setCartIcon(<FaCartShopping />);
      setIsOpen(false);
    }
  };

  const handleSignout = () => {
    Toggler();
    signOut({ redirect: false });
    router.push("/");
  };

  console.log(user, "current user");

  console.log(session?.user.name, "user");

  return (
    <div className="md:flex sticky top-0 left-0 z-10 w-full bg-black justify-between block md:py-8 md:items-Start  pb-0">
      <div className="flex sticky py-8 md:py-0 bg-black z-10 w-full md:w-fit justify-between items-center">
        <h1 className="mx-10 my-2 font-bold text-2xl text-blue-300">Eureka</h1>

        <div
          onClick={Toggler}
          className="md:hidden h-full flex items-center cursor-pointer mx-4 pr-10 text-2xl hover:text-blue-300 text-white relative"
        >
          {isOpen ? <IoClose /> : <FaBars />}
          {!session || Num === 0 ? null : (
            <span className="text-xs bg-red-900 text-white py-1 px-2 rounded absolute left-2 bottom-2">
              {Num}
            </span>
          )}
        </div>
      </div>

      <div
        className={` ${styles.first}  ${
          isOpen ? styles.ul : styles.ulReverse
        } absolute md:relative w-full md:w-fit `}
      >
        {session ? (
          <ul
            className={`md:flex w-full h-screen items-center py-5 md:py-0 md:pr-10  text-sm text-black  md:h-fit md:text-white bg-white  md:bg-black `}
          >
            <li
              onClick={Toggler}
              className="mx-10 my-2 md:mx-6 active:text-blue-500 hover:text-blue-300"
            >
              <Link href="/">Home </Link>
            </li>
            <li
              onClick={Toggler}
              className="mx-10 my-2 md:mx-6  hover:text-blue-300"
            >
              <Link href="/products">Products </Link>
            </li>
            <li
              onClick={Toggler}
              className="mx-10 my-2 md:mx-6 relative hover:text-blue-300"
            >
              <Link href="/cart"> {cartIcon} </Link>
              {Num === 0 ? null : (
                <span className="text-sm bg-red-900 text-white py-1 px-2 rounded md:absolute left-5 bottom-2">
                  {Num}
                </span>
              )}
            </li>
            <li
              onClick={Toggler}
              className="mx-10 my-2 md:mx-6 flex items-center"
            >
              <div className="flex justify-center rounded-full overflow-hidden w-6 h-6">
                <Image
                  src={user?.picture || "/next.svg"}
                  alt={"profile picture"}
                  className="object-cover"
                  width={20}
                  height={10}
                />
              </div>
              <Link href={`/users/${session?.user.name}`}>
                <span className="ml-2">{session?.user.name}</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleSignout();
                }}
                className="text-green-500 hover:text-red-800 md:bg-green-500 md:hover:bg-red-700 md:hover:text-white md:text-white mx-10 md:mx-0 md:px-4 py-2 my-2  md:ml-4 rounded"
              >
                Sign out
              </button>
            </li>
          </ul>
        ) : (
          <ul
            className={`md:flex items-center  h-screen py-5 md:py-0 md:pr-10 md:h-fit text-sm text-black md:text-white bg-white md:bg-black w-full`}
          >
            <li>
              <Link href="/login">
                <button
                  onClick={Toggler}
                  className="text-black hover:text-green-500 md:bg-green-500 md:text-white mx-6 md:mx-0 md:px-4 py-2 md:ml-4 rounded md:hover:bg-green-600"
                >
                  Sign in
                </button>
              </Link>
            </li>

            <li>
              <Link href="/register">
                <button
                  onClick={Toggler}
                  className="text-black hover:text-green-500 md:bg-green-500 md:text-white mx-6 md:mx-0 md:px-4 py-2 md:ml-4 rounded md:hover:bg-green-600"
                >
                  Register
                </button>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
