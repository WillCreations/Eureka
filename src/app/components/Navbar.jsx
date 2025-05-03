"use client";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCartShopping, FaBars, FaSketch } from "react-icons/fa6";
import ProductCart from "../../contextProvider/Prod";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import * as styles from "@/app/Styles/index.module.css";
import { usePathname } from "next/navigation";

const Navbar = ({ Action }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState();
  const Pathname = usePathname();

  // const Pixel = async () => {
  //   const response = await fetch(`/api/user?search=${session?.user.email}`);
  //   const data = await response.json();
  //   console.log(data, "da da da ta");
  //   setUser(data);
  // };

  // useEffect(() => {
  //   Pixel();
  // }, [session]);

  const parallax = useContext(ProductCart);
  const Num = parallax.CartNumber;

  const Toggler = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = "auto";
  };
  const Toggle = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const handleSignout = () => {
    Toggler();
    signOut({ redirect: false });
    router.push("/");
  };

  useEffect(() => {
    const wrapper = async () => {
      const res = await Action(session?.user.email);
      if (res) {
        const user = JSON.parse(res);
        setUser({ ...user });
      }
    };
    wrapper();
  }, [session]);

  console.log(user, "current user");

  console.log(session?.user.name, "user");

  return (
    <div className="md:flex sticky z-[100] top-0 left-0  w-full bg-black justify-between block md:py-8 md:items-Start  pb-0">
      <div className="flex sticky lg:pl-28 px-10 md:pr-0 py-8 md:py-0 bg-black z-10 w-full md:w-fit justify-between items-center">
        <Link href="/">
          <div className="flex  my-2 items-center">
            <div className="flex mr-2 mb-2  items-center">
              <Image
                src={"/avatar/brandlogo.svg"}
                alt={"Eureka logo"}
                className="object-cover"
                width={20}
                height={10}
              />
            </div>
            <h1 className="p-0 font-bold text-2xl text-blue-300">Eureka</h1>
          </div>
        </Link>

        <div
          onClick={Toggle}
          className="md:hidden h-full flex items-center cursor-pointer  text-2xl hover:text-white text-blue-300 relative"
        >
          {isOpen ? <IoClose /> : <FaBars />}
          {!session || Num === 0 || isOpen ? null : (
            <span className="text-xs bg-red-900 text-white py-1 px-2 rounded absolute left-2 bottom-2">
              {Num}
            </span>
          )}
        </div>
      </div>

      {session ? (
        <div className="hidden lg:flex justify-center items-center  ">
          <ul
            className={`text-sm h-full flex justify-center items-center text-white  bg-black `}
          >
            <li
              className={`${
                Pathname === "/"
                  ? "text-green-300 border-solid border-b-2 border-green-300"
                  : null
              } mx-10 my-2 md:mx-6  hover:text-green-300`}
            >
              <Link href="/">Home </Link>
            </li>
            <li
              className={`${
                Pathname.startsWith("/portfolio")
                  ? "text-green-300 border-solid border-b-2 border-green-300"
                  : null
              } mx-10 my-2 md:mx-6   hover:text-green-300`}
            >
              <Link href="/portfolio">Portfolio </Link>
            </li>
            <li
              className={`${
                Pathname.startsWith("/products")
                  ? "text-green-300 border-solid border-b-2 border-green-300"
                  : null
              } mx-10 my-2 md:mx-6   hover:text-green-300`}
            >
              <Link href="/products">Shop</Link>
            </li>
            <li
              className={`${
                Pathname.startsWith("/cart")
                  ? "text-green-300 border-solid border-b-2 border-green-300"
                  : null
              } mx-10 my-2 md:mx-6 relative  hover:text-green-300`}
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
          </ul>
        </div>
      ) : null}

      <div
        className={` ${styles.first}  ${
          isOpen ? styles.ul : styles.ulReverse
        } absolute md:pr-10 lg:pr-28 md:relative lg:h-full w-full md:w-fit `}
      >
        {session ? (
          <ul
            className={`md:flex w-full h-screen items-center py-5 md:py-0   lg:h-full text-sm text-green-300  md:h-full md:text-white bg-[#121212]  md:bg-black `}
          >
            <li
              onClick={Toggler}
              className={`${
                Pathname === "/"
                  ? "text-green-300 bg-black border-solid border-b-2 border-green-300"
                  : null
              } lg:hidden px-10 py-5 md:p-0 md:my-2 md:mx-6   hover:text-green-300`}
            >
              <Link href="/">Home </Link>
            </li>

            <li
              onClick={Toggler}
              className={`${
                Pathname.startsWith("/portfolio")
                  ? "text-green-300 bg-black border-solid border-b-2 border-green-300"
                  : null
              } lg:hidden px-10 py-5 md:p-0 md:my-2 md:mx-6   hover:text-green-300`}
            >
              <Link href="/portfolio">Portfolio </Link>
            </li>
            <li
              onClick={Toggler}
              className={`${
                Pathname.startsWith("/products")
                  ? "text-green-300 bg-black border-solid border-b-2 border-green-300"
                  : null
              } lg:hidden px-10 py-5 md:p-0 md:my-2 md:mx-6   hover:text-green-300`}
            >
              <Link href="/products">Shop</Link>
            </li>
            <li
              onClick={Toggler}
              className={`${
                Pathname.startsWith("/cart")
                  ? "text-green-300 bg-black border-solid border-b-2 border-green-300"
                  : null
              } lg:hidden px-10 md:p-0 py-5 md:my-2 md:mx-6 relative  hover:text-green-300`}
            >
              <Link href="/cart" className="flex items-center flex-nowrap">
                <div className="mr-1">Cart </div>
                <FaCartShopping />
              </Link>
              {Num === 0 ? null : (
                <span className="text-sm bg-red-900 text-white py-1 px-2 rounded absolute top-[0%] left-[11%] md:left-5 md:bottom-2">
                  {Num}
                </span>
              )}
            </li>
            <li
              onClick={Toggler}
              className={`${
                Pathname.startsWith("/users")
                  ? "text-green-300 bg-black border-solid border-b-2 border-green-300 md:border-b-0"
                  : null
              } px-10 py-5 md:p-0 md:my-2 md:mx-6 flex items-center`}
            >
              <div
                className={`${
                Pathname.startsWith("/users") ? "border-2 border-green-300 border-solid":null} flex justify-center rounded-full overflow-hidden w-6 h-6`}
              >
                <Image
                  src={
                    user?.image
                      ? user?.image
                      : session?.user.image
                      ? session?.user.image
                      : session?.user.picture
                      ? session?.user.picture
                      : "/personHead.svg"
                  }
                  alt={"profile picture"}
                  style={{ objectFit: "cover" }}
                  width={100}
                  height={100}
                />
              </div>
              <Link href={`/users/${session?.user.email}`}>
                <span className="ml-2 capitalize">
                  {user?.name ? user?.name : session?.user.name}
                </span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleSignout();
                }}
                className="text-green-300 md:text-black hover:text-red-800 md:bg-green-300 md:hover:bg-red-700 md:hover:text-white mx-10 md:mx-0 md:px-4 py-2 my-5 md:my-2  md:ml-4 rounded"
              >
                Sign out
              </button>
            </li>
          </ul>
        ) : (
          <ul
            className={`md:flex items-center   h-screen py-5 md:py-0  md:h-full text-sm text-black md:text-white bg-[#121212]  md:bg-black w-full`}
          >
            <li>
              <Link href="/login">
                <button
                  onClick={Toggler}
                  className="text-green-300 md:text-black my-5 md:my-2 hover:text-white md:bg-green-300  mx-10 md:mx-0 md:px-4 py-2 md:ml-4 rounded md:hover:bg-green-600"
                >
                  Sign in
                </button>
              </Link>
            </li>

            <li>
              <Link href="/register">
                <button
                  onClick={Toggler}
                  className="text-green-300 md:text-black my-5 md:my-2 hover:text-white md:bg-green-300 mx-10 md:mx-0 md:px-4 py-2 md:ml-4 rounded md:hover:bg-green-600"
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
