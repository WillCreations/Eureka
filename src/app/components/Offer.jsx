import React from "react";
import * as styles from "@/app/Styles/index.module.css";

const Offer = ({ Obj, index, colour }) => {
  return (
    <div
      key={index}
      className={`${styles.Pop} col-span-1 ${
        index === 3 && "lg:col-span-3"
      } flex justify-center `}
    >
      <div
        className={`bg-${colour}  rounded-2xl px-8 py-10  w-full ${
          index === 3 && "lg:w-1/3"
        } h-full`}
      >
        <div className="text-green-300 text-xl font-bold">{Obj.Tag}</div>
        <div className="text-white my-3 text-6xl font-bold">
          &#8358;{Obj.Price}
          <span className="text-gray-300 text-4xl">{Obj.Denomination}</span>
        </div>
        <div className="text-gray-300 my-3 text-md font-thin ">
          Up to{" "}
          <span className="text-green-300 text-xl font-bold ">
            {Obj.Bonus}%
          </span>{" "}
          off, refferal ARR
        </div>
        <div className="text-white mt-10 text-mg font-bold">
          {Obj.FeatureTag}:
        </div>
        <div className="text-gray-300 my-3 text-md font-thin ">
          {Obj.Feature?.map((f, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-10 justify-center items-start"
              >
                <div className="col-span-1">&rarr;</div>
                <div className="col-span-9 text-left">{f}</div>
              </div>
            );
          })}
        </div>
        {Obj.Recommended && (
          <div className="mt-14 flex justify-center">
            <div className="px-10 py-2 italic rounded-full w-fit bg-green-700 text-green-300">
              Recommended
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offer;
