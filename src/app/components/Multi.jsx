import { useContext, useEffect, useState } from "react";
import ProductCart from "@/contextProvider/Prod";
import Toast from "@/app/components/Toast";

const Multi = ({ ToastDisplay, SingleProd,updateStock }) => {
  const context = useContext(ProductCart);
  const prodo = context.Cart;
  const index = context.index(SingleProd._id);
  const [last, setLast] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  console.log("index: ", index);

  const { count } = SingleProd;

  const Quant = (prod, value) => {
   return context.QuantHandle(prod, value);
  };

  const ErrorDisplay = (error) => {
    setError(error);
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 5000);
  };

  const HandleReducer = async () => {
    setIsLoading(true);
   Quant(SingleProd, "Dec");
const response = await updateStock({
      id: SingleProd._id,
      stock: 1,
      type: "Inc",
    });

    console.log({ response});
    if (response.ok) {
      setIsLoading(false);
      console.log({ response: response.message });
    }

    if (prodo[index].count === 0) {
      setLast(true);
    }
  };

  useEffect(() => {
    if (last) {
      const res = context.Remove(SingleProd._id);
      console.log({ res });
      ToastDisplay(res);
      setLast(false);
    }
  }, [last]);

  const HandleIncrease = async () => {
    setError("");
    try {
     await Quant(SingleProd, "Inc");
      const response = await updateStock({
        id: SingleProd._id,
        stock: 1,
        type: "Dec",
      });

      if (response.ok) {
        
        console.log({ response: response.message });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      ErrorDisplay(error.message);
    }
  };
  return (
    <div className="flex w-full justify-between items-center ">
      <button
        className="bg-green-300 text-black px-6 py-5 rounded-l-2xl "
        onClick={() => {
          HandleReducer();
        }}
      >
        -
      </button>
      <span className="px-5">{last ? count : prodo[index].count}</span>
      <button
        className="bg-green-300 text-black px-6 py-5 rounded-r-2xl"
        onClick={() => {
          HandleIncrease();
        }}
      >
        +
      </button>
      {error && <Toast isError={isError} message={error} />}
    </div>
  );
};

export default Multi;
