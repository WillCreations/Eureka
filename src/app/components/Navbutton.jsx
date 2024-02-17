"use client";
import { useRouter } from "next/navigation";

const Navbutton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/register");
      }}
      className="px-3 py-3 mt-5 md:my-0 max-w-[15rem] rounded-md bg-green-500 hover:bg-green-400 text-white hover:text-green-950 hover:font-bold hover:scale-105 transition-all"
    >
      Let's Get Started
    </button>
  );
};

export default Navbutton;
