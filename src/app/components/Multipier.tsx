"use Client";
import { useState, useEffect } from "react";

const Multipier = ({ SingleProd, Quant, disabler }) => {
  const { price, stock } = SingleProd;
  const [feedback, setFeedback] = useState(price);

  const HandleReducer = () => {
    Quant(SingleProd, "Dec");
  };

  const HandleIncrease = () => {
    Quant(SingleProd, "Inc");
  };

  useEffect(() => {
    const update = () => {
      setFeedback(() => {
        console.log(stock, price, "new multiples");
        const one = stock * price;
        return one;
      });
    };

    update();
  }, [stock]);

  return (
    <div className="flex flex-col justify-between ">
      <div className="flex items-center">
        <button
          disabled={!disabler && true}
          className="bg-green-300 text-black px-5 py-3 disabled:bg-gray-200 disabled:text-gray-300  rounded-l-btn"
          onClick={() => {
            HandleReducer();
          }}
        >
          -
        </button>
        <span className="px-5">{stock}</span>
        <button
          disabled={!disabler && true}
          className="bg-green-300 text-black px-5 py-3 disabled:bg-gray-200 disabled:text-gray-300   rounded-r-btn"
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
          ${feedback}
        </span>
      </div>
    </div>
  );
};

export default Multipier;
