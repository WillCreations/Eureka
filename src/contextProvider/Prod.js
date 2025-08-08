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
      const oldsession = localStorage.getItem("session");
      const storedCart = localStorage.getItem("cart");
      if (oldsession) {
        const olduser = JSON.parse(oldsession);
        if (storedCart) {
          const persist = JSON.parse(storedCart);
          localStorage.getItem("session");

          if (session?.user) {
            localStorage.setItem("session", JSON.stringify(session?.user));

            if (persist && session?.user.email === olduser.email) {
              setcartWheels(persist);
            } else {
              localStorage.removeItem("cart");
            }
          }
        }
      }
    };

    checker();
  }, [session?.user]);

  const AddHandler = (CartMover) => {
    const altered = { ...CartMover, count: 1, stock: CartMover.stock - 1 };
    console.log({ altered });
    setcartWheels((prevCart) => {
      const NewCart = prevCart.concat(altered);
      localStorage.setItem("cart", JSON.stringify(NewCart));
      localStorage.setItem("session", JSON.stringify(session?.user));
      return prevCart.concat(altered);
    });

    return `${CartMover?.name} added to cart`;
  };

  const RemoveHandler = (Id) => {
    setcartWheels((prevCart) => {
      return prevCart.filter((c) => {
        return c._id !== Id;
      });
    });

    localStorage.removeItem("cart", Id);

    const CartMover = cartWheels.find((c) => {
      return c._id === Id;
    });
    console.log({ CartMover });
    if (CartMover) {
      return `${CartMover?.name} removed from cart`;
    }
  };

  const HandleQuantity = async (item, value) => {
    try {
      let Ind = 0;
      if (value === "Inc") {
        await cartWheels.forEach((cart, index) => {
          if (cart._id === item._id) {
            Ind = index;
          }
        });

        const newCart = cartWheels;
        if (newCart[Ind].stock === 0) {
          throw new Error(`${newCart[Ind].name} is out of stock`);
        }
        if (newCart[Ind].stock !== 0) {
          newCart[Ind].count += 1;
          const newStock = (newCart[Ind].stock -= 1);
          setcartWheels([...newCart]);
        }
      } else if (value === "Dec") {
        cartWheels.forEach((cart, index) => {
          if (cart._id === item._id) {
            Ind = index;
          }
        });

        const newCart = cartWheels;
        if (newCart[Ind].count >= 1) {
          newCart[Ind].count -= 1;
          const prevStock = newCart[Ind].stock;
          console.log({ prevStock });
          const newStock = (newCart[Ind].stock += 1);
          console.log({ newStock });
          setcartWheels([...newCart]);
        }
      }
    } catch (error) {
      throw new Error(error.message);
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
