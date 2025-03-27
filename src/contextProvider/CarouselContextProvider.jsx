"use client";
import { createContext, useState } from "react";

const CarouselContext = createContext({
  active: 0,
  Activator: (p, action, index) => {},
});

export const CarouselContextProvider = ({ children }) => {
  const [active, setActive] = useState(0);

  const Activator = (p, action, index) => {
    if (action === "prev") {
      if (active > 0) {
        setActive((prev) => {
          return (prev -= 1);
        });
      } else {
        setActive(p.length - 1);
      }
    } else if (action === "next") {
      if (active < p.length - 1) {
        setActive((prev) => {
          return (prev += 1);
        });
      } else {
        setActive(p.length - p.length);
      }
    } else {
      setActive(index);
    }
  };

  const context = {
    active: active,
    Activator: Activator,
  };
  return (
    <CarouselContext.Provider value={context}>
      {children}
    </CarouselContext.Provider>
  );
};

export default CarouselContext;
