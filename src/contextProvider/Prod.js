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
  feeder: 0,
});

export const ProductCartProvider = (props) => {
  const { data: session } = useSession();
  const [cartWheels, setcartWheels] = useState([]);
  const [summer, setSummer] = useState();
  const [fed, setFed] = useState({ feeder: "" });

  useEffect(() => {
    const checker = () => {
      console.log(session?.user, "session");
      const oldsession = localStorage.getItem("session");
      const storedCart = localStorage.getItem("cart");
      const old = JSON.parse(oldsession);
      console.log(old, "old");
      console.log(storedCart, "storedCart");

      if (session?.user) {
        if (storedCart && session?.user.email === old.email) {
          setcartWheels(JSON.parse(storedCart));
        } else {
          localStorage.removeItem("cart");
        }
      }
    };

    checker();
  }, [session?.user]);

  const AddHandler = (CartMover) => {
    console.log(cartWheels, "array");
    setcartWheels((prevCart) => {
      const NewCart = prevCart.concat(CartMover);
      localStorage.setItem("cart", JSON.stringify(NewCart));
      localStorage.setItem("session", JSON.stringify(session?.user));
      return prevCart.concat(CartMover);
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
    let Ind = -1;
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
      if (newCart[Ind].stock > 1) {
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

  const context = {
    Cart: cartWheels,
    CartNumber: cartWheels.length,
    sum: summer,
    Add: AddHandler,
    Remove: RemoveHandler,
    Bool: Booleanator,
    QuantHandle: HandleQuantity,
    feeder: fed,
  };
  return (
    <ProductCart.Provider value={context}>
      {props.children}
    </ProductCart.Provider>
  );
};

export default ProductCart;
