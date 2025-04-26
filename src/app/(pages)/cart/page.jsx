"use client";
import { useContext, useState, useEffect } from "react";
import ProductCart from "../../../contextProvider/Prod";
import CartButton from "../../components/CartButton";
import Multipier from "../../components/Multipier";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getStripe from "@/app/(Engine)/stripe/getStripe";
import toast from "react-hot-toast";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const metadata = {
  title: "Shopping Cart",
};

const Cart = () => {
  const [total, setTotal] = useState(0);
  const parallax = useContext(ProductCart);
  const produce = parallax.Cart;
  const router = useRouter();
  const { data: session } = useSession();
  const [showSpinner, setShowSpinner] = useState(false);
  const [checkout, setCheckout] = useState("text-green-300");

  const HandleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produce),
    });

    if (response.status === 500) return;

    console.log(response, "responser");

    const data = await response.json();

    console.log(data, "stripe data");

    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  const TotalFeed = () => {
    let ans = 0;
    produce.map((item) => {
      ans += item.stock * item.price;
    });

    setTotal(ans);

    if (produce.length === 0) {
      console.log("cartlength is zero");
      router.push("/products");
    }
  };

  useEffect(() => {
    TotalFeed();
  }, [produce]);

  const HandleQuant = (item, value) => {
    parallax.QuantHandle(item, value);
  };

  const HandleAdd = (SingleProduct) => {
    const Id = SingleProduct._id;
    const bool = parallax.Bool(Id);

    if (bool) {
      return parallax.Remove(Id);
    }
  };

  const startSpinner = () => {
    setShowSpinner(true);
    setCheckout("bg-green-500 text-black");
    setTimeout(() => {
      setShowSpinner(false);
      setCheckout("text-green-500");
    }, 30000); // Hides the spinner after 2 seconds (you can adjust this value)
  };

  // console.log(session?.user, "Session details")
  // console.log(session?.user.phone, "phone details")
  // console.log(process.env.FLW_PUBLIC_KEY, "process")
  // const config = {
  //   public_key:process.env.FLW_PUBLIC_KEY,
  //   tx_ref: Date.now(),
  //   amount: total,
  //   currency: 'NGN',
  //   payment_options: 'card,mobilemoney,ussd',
  //   customer: {
  //     email: session?.user.email,
  //     phone_number: session?.user.phone,
  //     name: session?.user.name,
  //   },
  //   customizations: {
  //     title: 'Eureka',
  //     description: 'Payment for items in cart',
  //     logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
  //   },
  // };
  //  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="min-h-screen mx-10 lg:mx-28 text-white ">
      <div className="flex sticky bg-black py-5 top-[112px] left-0  w-full   flex-col">
        <div className="flex justify-between items-center">
          <h1 className=" hidden md:block  text-4xl font-extrabold text-green-300 flex-1">
            Cart
          </h1>
          <h1 className="  w-full md:w-40 bg-[#121212] px-5 text-black py-5 rounded-md ">
            <span className=" block text-center text-4xl text-green-300 font-extrabold">
              ${total}
            </span>
            <p className="text-center text-gray-300">Sub Total</p>
          </h1>
        </div>
      </div>
      <div className="  gap-5 mb-5 grid grid-cols-1 lg:grid-cols-2">
        {produce.map((prod) => {
          return (
            <div className="  bg-[#121212] rounded-md px-5" key={prod._id}>
              <div className="my-5  flex justify-between items-center">
                <div className="grid grid-cols-1 w-full">
                  <div className="grid gap-5 grid-cols-2 p-5 w-full">
                    <div className=" col-span-1">
                      <div className="rounded-md flex justify-center items-center bg-white w-full h-60 lg:h-64 overflow-hidden ">
                        <Image
                          src={prod.image}
                          alt={prod.description}
                          height={1000}
                          width={1000}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between xl:flex-row col-span-1">
                      <div className="flex-col justify-between items-between ">
                        <div>
                          <h2 className="text-2xl text-green-300 font-bold">
                            {prod.name}
                          </h2>
                          <h2>{prod.category}</h2>
                          <h1 className="text-2xl">${prod.price}</h1>
                        </div>
                        <div className="mt-5">
                          <Multipier
                            SingleProd={prod}
                            Quant={HandleQuant}
                            disabler={parallax.Bool(prod._id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center p-5 text-white items-end ">
                    <CartButton
                      SingleProd={prod}
                      show={parallax.Bool(prod._id) ? "Remove" : "Add"}
                      AddHandler={HandleAdd}
                      colour="bg-black"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-5 justify-start items-Start ">
        <button
          className="hover:bg-gray-300 py-5 rounded-xl hover:text-black text-gray-300 bg-[#121212] col-span-1 "
          // onClick={() => {
          //   handleFlutterPayment({
          //       callback: (response) => {
          //       console.log(response);
          //       if (response.status === "completed") {
          //          router.push("/success")
          //        }
          //       closePaymentModal() // this will close the modal programmatically
          //     },
          //     onClose: () => {
          //       console.log("closed")
          //     },
          //   })
          // }}
        >
          Pay with Flutterwave!
        </button>

        <button
          className={`hover:bg-green-300 py-5 col-span-1 active:scale-95 active:bg-green-500 ${checkout} active:text-black flex items-center justify-center hover:text-black  transition-all w-full rounded-lg py-3  border-solid border-green-300 border-2`}
          onClick={() => {
            startSpinner(), HandleCheckout();
          }}
        >
          {showSpinner ? (
            <span className={`animate-spin font-extrabold mr-2`}>
              <AiOutlineLoading3Quarters />
            </span>
          ) : null}
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
