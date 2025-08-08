"use client";
import React, { useState, useEffect } from "react";
import Rating from "@/app/components/Rating";
import { useSession } from "next-auth/react";

const Rater = ({ prod, Action }) => {
  const { data: session } = useSession();
  const [rates, setRates] = useState([
    { name: 0, value: false },
    { name: 1, value: false },
    { name: 2, value: false },
    { name: 3, value: false },
    { name: 4, value: false },
  ]);
  console.log({ prod });
  console.log({ product_averageRate: prod.averageRate });
  const [ra, setRa] = useState(prod?.averageRate);
  const funct = async (index) => {
    if (session) {
      const currentRate = rates.filter((r) => r.value === true);
      const response = await Action(prod._id, session?.user.id, index + 1);
    }
  };
  //   useEffect(() => {
  //     const funct = async () => {
  //       if (session) {
  //         const currentRate = rates.filter((r) => r.value === true);
  //         const response = await Action(
  //           prod._id,
  //           session?.user.id,
  //           currentRate.length
  //         );
  //       }
  //     };

  //     funct();
  //   }, [rates]);
  return (
    <div className="flex items-center gap-1 my-1">
      {rates.map((rate, index) => {
        return (
          <div
            key={index}
            className="text-2xl text-gray-300"
            onClick={() => {
              setRa(index + 1);
              funct(index);
              //   console.log(`${index} was clicked`);
              //   const rateToChange = rates[index];
              //   const updatedRates = rates.filter((task, i) => i !== index);
              //   updatedRates.splice(index, 0, {
              //     ...rateToChange,
              //     value: !rates[index].value,
              //   });

              //   setRates(updatedRates);
            }}
          >
            <Rating rate={ra !== undefined && index + 1 <= ra ? true : false} />
          </div>
        );
      })}
    </div>
  );
};

export default Rater;
