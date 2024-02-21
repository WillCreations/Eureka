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

const Cart = () => {
  const [total, setTotal] = useState(0);
  const parallax = useContext(ProductCart);
  const produce = parallax.Cart;
  const router = useRouter();
  const { data: session } = useSession();
  const [showSpinner, setShowSpinner] = useState(false);
  const [checkout, setCheckout] = useState("text-green-500");

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
    <div className=" mx-6">
      <div className="flex flex-col w-full">
        <div className="flex md:mx-5 justify-between items-center">
          <h1 className=" hidden md:block  text-2xl font-extrabold text-green-500 flex-1">
            Shopping Cart
          </h1>
          <h1 className="  w-full md:w-40 bg-white px-2 text-black py-2 rounded-md ">
            <span className=" block text-center text-2xl text-green-700 font-extrabold">
              {total}
            </span>
            <p className="text-center">Sub Total</p>
          </h1>
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2">
        {produce.map((prod) => {
          return (
            <div
              className="my-5 md:mx-5 bg-gray-900 rounded-md px-5"
              key={prod._id}
            >
              <div className="my-5  flex justify-between items-center">
                <div className="grid grid-cols-3 w-full">
                  <div className="my-5 mr-10 col-span-1">
                    <div className="rounded-md  overflow-hidden ">
                      <Image
                        src={prod.image}
                        alt={prod.description}
                        height={200}
                        width={200}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between xl:flex-row col-span-2">
                    <div className="py-5 pr-5 mr-10">
                      <h2>{prod.name}</h2>
                      <h2>{prod.category}</h2>
                      <h1 className="text-2xl">#{prod.price}</h1>
                      <div className="mt-5">
                        <Multipier
                          SingleProd={prod}
                          Quant={HandleQuant}
                          disabler={parallax.Bool(prod._id)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end items-end ml-5 my-5">
                      <CartButton
                        SingleProd={prod}
                        show={parallax.Bool(prod._id) ? "Remove" : "Add"}
                        AddHandler={HandleAdd}
                        colour="bg-red-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex mt-5 flex-col justify-start items-Start mx-5">
        <button
          className="btn btn-ghost "
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
          className={`hover:bg-green-500 mt-3 active:scale-95 active:bg-green-700 ${checkout} active:text-black flex items-center justify-center hover:text-black  transition-all w-full rounded-lg py-3  border-solid border-green-500 border-2`}
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
