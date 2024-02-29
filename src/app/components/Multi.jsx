import { useContext, useEffect, useState } from "react";
import ProductCart from "@/contextProvider/Prod";
const Multi = ({ SingleProd }) => {
  const context = useContext(ProductCart);
  const prodo = context.Cart;
  const [index, setIndex] = useState(-1);
  const { stock } = SingleProd;

  useEffect(() => {
    prodo.forEach((p, index) => {
      console.log(p, index, "cart index");

      if (p._id === SingleProd._id) {
        setIndex(index);
      }
    });
  }, [prodo]);

  const Quant = (prod, value) => {
    context.QuantHandle(prod, value);
  };

  const HandleReducer = () => {
    Quant(SingleProd, "Dec");
    if (prodo[index].stock === 1) {
      setIndex(-1);
      context.Remove(SingleProd._id);
    }
  };

  const HandleIncrease = () => {
    Quant(SingleProd, "Inc");
  };

  return (
    <div className="flex w-full justify-between items-center ">
      <button
        className="bg-yellow-500 text-black px-5 py-3 rounded-l-btn "
        onClick={() => {
          HandleReducer();
        }}
      >
        -
      </button>
      <span className="px-5">{index === -1 ? stock : prodo[index].stock}</span>
      <button
        className="bg-yellow-500 text-black px-5 py-3 rounded-r-btn"
        onClick={() => {
          HandleIncrease();
        }}
      >
        +
      </button>
    </div>
  );
};

export default Multi;
