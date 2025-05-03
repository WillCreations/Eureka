import { useContext, useEffect, useState } from "react";
import ProductCart from "@/contextProvider/Prod";
const Multi = ({ SingleProd }) => {
  const context = useContext(ProductCart);
  const prodo = context.Cart;
  const index = context.index(SingleProd._id);
  const [last, setLast] = useState(false);
  console.log("index: ", index);

  const { stock } = SingleProd;

  const Quant = (prod, value) => {
    context.QuantHandle(prod, value);
  };

  const HandleReducer = () => {
    Quant(SingleProd, "Dec");
    console.log("stock count: ", prodo[index].stock);
    if (prodo[index].stock === 0) {
      setLast(true);
    }
  };

  useEffect(() => {
    if (last) {
      context.Remove(SingleProd._id);
    }
  }, [last]);

  const HandleIncrease = () => {
    Quant(SingleProd, "Inc");
  };

  return (
    <div className="flex w-full justify-between items-center ">
      <button
        className="bg-green-300 text-black px-6 py-5 rounded-l-btn "
        onClick={() => {
          HandleReducer();
        }}
      >
        -
      </button>
      <span className="px-5">{last ? stock : prodo[index].stock}</span>
      <button
        className="bg-green-300 text-black px-6 py-5 rounded-r-btn"
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
