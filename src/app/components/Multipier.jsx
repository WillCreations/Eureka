"use client";
import { useState, useEffect, useContext } from "react";
import ProductCart from "@/contextProvider/Prod";
import Toast from "@/app/components/Toast";

const Multipier = ({ SingleProd, Quant, disabler, updateStock }) => {
  const { price, count } = SingleProd;
  const [feedback, setFeedback] = useState(price);
  const context = useContext(ProductCart);
  const prodo = context.Cart;
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [last, setLast] = useState(false);

  const ErrorDisplay = (error) => {
    setError(error);
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 5000);
  };

  const HandleReducer = async () => {
    setIsLoading(true);
    await Quant(SingleProd, "Dec");
    const response = await updateStock({
      id: SingleProd._id,
      stock: 1,
      type: "Inc",
    });

    if (response.ok) {
      setIsLoading(false);
      console.log({ response: response.message });
    }
    const index = context.index(SingleProd._id);

    const truce = prodo[index]?.count === 0;

    if (truce) {
      setLast(true);
    }
  };

  useEffect(() => {
    if (last) {
      const res = context.Remove(SingleProd._id);

      ErrorDisplay(res);
      setLast(false);
    }
  }, [last]);

  const HandleIncrease = async () => {
    setIsLoading(true);
    setError("");
    try {
      await Quant(SingleProd, "Inc");

      const response = await updateStock({
        id: SingleProd._id,
        stock: 1,
        type: "Dec",
      });
      if (response.ok) {
        setIsLoading(false);
        console.log({ response: response.message });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      ErrorDisplay(error.message);
    }
  };

  useEffect(() => {
    const update = () => {
      setFeedback(() => {
        const one = count * price;
        return one;
      });
    };

    update();
  }, [count]);

  return (
    <div className="flex flex-col justify-between ">
      <div className="grid grid-cols-3 items-center">
        <button
          disabled={!disabler || isLoading}
          className={`bg-green-300 font-black text-black xxs:px-5 py-3 ${
            !disabler && "disabled:bg-gray-200 disabled:text-gray-300"
          } rounded-l-btn`}
          onClick={() => {
            HandleReducer();
          }}
        >
          -
        </button>
        <span className="text-center xxs:px-5">{count ? count : 1}</span>
        <button
          disabled={!disabler || isLoading}
          className={`bg-green-300 font-black text-black xxs:px-5 py-3 ${
            !disabler && "disabled:bg-gray-200 disabled:text-gray-300"
          }   rounded-r-btn`}
          onClick={() => {
            HandleIncrease();
          }}
        >
          +
        </button>
      </div>
      <div className="text-md text-gray-300 mt-5">
        Unit Sum:
        <br />
        <span
          className={`${
            !disabler && true ? "text-gray-200" : "text-green-300"
          } text-4xl font-bold`}
        >
          ${isNaN(feedback) ? price : feedback}
        </span>
      </div>
      {error && <Toast isError={isError} message={error} />}
    </div>
  );
};

export default Multipier;
