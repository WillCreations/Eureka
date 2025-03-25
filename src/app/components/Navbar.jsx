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
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [touch, setTouch] = useState("hidden");
  const [cartIcon, setCartIcon] = useState(<FaCartShopping />);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState();
  const Pathname = usePathname();

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
    <div className="md:flex md:px-28 px-10 sticky top-0 left-0 z-10 w-full bg-black justify-between block md:py-8 md:items-Start  pb-0">
      <div className="flex sticky py-8 md:py-0 bg-black z-10 w-full md:w-fit justify-between items-center">
        <div className="flex  my-2 items-center">
          <div className="flex mr-2 mb-2  items-center">
            <Image
              src={"avatar/brandlogo.svg"}
              alt={"Eureka logo"}
              className="object-cover"
              width={20}
              height={10}
            />
          </div>
          <h1 className="p-0 font-bold text-2xl text-blue-300">Eureka</h1>
        </div>

        <div
          onClick={Toggler}
          className="md:hidden h-full flex items-center cursor-pointer  text-2xl hover:text-white text-blue-300 relative"
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
            className={`md:flex w-full h-screen items-center py-5 md:py-0   text-sm text-black  md:h-fit md:text-white bg-white  md:bg-black `}
          >
            <li
              onClick={Toggler}
              className={`${
                Pathname === "/"
                  ? "text-green-300 border-solid border-b-2 border-green-300"
                  : null
              } mx-10 my-2 md:mx-6  pb-2  hover:text-green-300`}
            >
              <Link href="/">Home </Link>
            </li>
            <li
              onClick={Toggler}
              className={`${
                Pathname === "/products"
                  ? "text-green-300 border-solid border-b-2 border-green-300"
                  : null
              } mx-10 my-2 md:mx-6  pb-2  hover:text-green-300`}
            >
              <Link href="/products">Products </Link>
            </li>
            <li
              onClick={Toggler}
              className={`${
                Pathname === "/cart"
                  ? "text-green-300 border-solid border-b-2 border-green-300"
                  : null
              } mx-10 my-2 md:mx-6 relative  pb-2  hover:text-green-300`}
            >
              <Link href="/cart" className="flex items-center flex-nowrap">
                <div className="mr-1">Cart </div>
                <FaCartShopping />
              </Link>
              {Num === 0 ? null : (
                <span className="text-sm bg-red-900 text-white py-1 px-2 rounded md:absolute left-5 bottom-2">
                  {Num}
                </span>
              )}
            </li>
            <li
              onClick={Toggler}
              className={`mx-10 my-2 md:mx-6 flex items-center`}
            >
              <div className="flex justify-center rounded-full overflow-hidden w-6 h-6">
                <Image
                  src={
                    session?.user.image
                      ? session?.user.image
                      : session?.user.picture || "/next.svg"
                  }
                  alt={"profile picture"}
                  className="object-cover"
                  width={20}
                  height={10}
                />
              </div>
              <Link href={`/users/${session?.user.email}`}>
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
