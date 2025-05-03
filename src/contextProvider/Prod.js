"use client";
import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const ProductCart = createContext({
  Cart: [],
  CartNumber: 0,
  sum: 0,
  Add: (CartMover) => {},
  Remove: (Id) => {},
  Bool: (Id) => {},
  QuantHandle: (item, value) => {},
  index: (s) => {},
  feeder: 0,
});

export const ProductCartProvider = (props) => {
  const { data: session } = useSession();
  const [cartWheels, setcartWheels] = useState([]);
  const [summer, setSummer] = useState();
  const [fed, setFed] = useState({ feeder: "" });
  const [indexing, setIndexing] = useState(-1);

  useEffect(() => {
    const checker = () => {
      console.log(session?.user, "session");

      const oldsession = localStorage.getItem("session");
      const storedCart = localStorage.getItem("cart");
      if (oldsession) {
        const olduser = JSON.parse(oldsession);
        if (storedCart) {
          const persist = JSON.parse(storedCart);
          localStorage.getItem("session");
          console.log("current: ", session?.user.email);
          console.log("old: ", olduser.email);
          console.log("storedCart: ", storedCart);

          if (session?.user) {
            console.log("Persist Loaded");
            localStorage.setItem("session", JSON.stringify(session?.user));

            if (persist && session?.user.email === olduser.email) {
              setcartWheels(persist);
            } else {
              console.log("cart deleted");
              localStorage.removeItem("cart");
            }
          }
        }
      }
    };

    checker();
  }, [session?.user]);

  const AddHandler = (CartMover) => {
    console.log(cartWheels, "array");
    setcartWheels((prevCart) => {
      const altered = { ...CartMover, stock: 1 };
      console.log({ altered });
      const NewCart = prevCart.concat(altered);
      localStorage.setItem("cart", JSON.stringify(NewCart));
      localStorage.setItem("session", JSON.stringify(session?.user));
      return prevCart.concat(altered);
    });
  };

  const RemoveHandler = (Id) => {
    setcartWheels((prevCart) => {
      return prevCart.filter((c) => {
        return c._id !== Id;
      });
    });

    localStorage.removeItem("cart", Id);
  };

  const HandleQuantity = (item, value) => {
    console.log(item, value);
    let Ind = 0;
    if (value === "Inc") {
      cartWheels.forEach((cart, index) => {
        console.log(index);
        if (cart._id === item._id) {
          Ind = index;
        }
      });

      const newCart = cartWheels;
      newCart[Ind].stock += 1;
      new setcartWheels([...newCart]);
    } else if (value === "Dec") {
      cartWheels.forEach((cart, index) => {
        if (cart._id === item._id) {
          Ind = index;
        }
      });

      const newCart = cartWheels;
      if (newCart[Ind].stock >= 1) {
        newCart[Ind].stock -= 1;
        setcartWheels([...newCart]);
      }
    }
  };

  const Booleanator = (Id) => {
    return cartWheels.some((c) => {
      return c._id === Id;
    });
  };

  const indexa = (s) => {
    let result;
    cartWheels.forEach((p, index) => {
      console.log(p, index, "cart index");

      if (p._id === s) {
        console.log("index in global: ", index);
        result = index;
      }
    });
    console.log("result: ", result);
    return result;
  };

  const context = {
    Cart: cartWheels,
    CartNumber: cartWheels.length,
    sum: summer,
    Add: AddHandler,
    Remove: RemoveHandler,
    Bool: Booleanator,
    QuantHandle: HandleQuantity,
    index: indexa,
    feeder: fed,
  };
  return (
    <ProductCart.Provider value={context}>
      {props.children}
    </ProductCart.Provider>
  );
};

export default ProductCart;
