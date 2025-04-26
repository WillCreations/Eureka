"use client";
import { useEffect, useState } from "react";
import * as styles from "@/app/Styles/index.module.css";
import { clearInterval } from "timers";
import Circle from "@/app/components/Circle";

const Round = ({ perc }) => {
  const [counting, setCounting] = useState(0);
  const [stroke, setStroke] = useState("red");
  const circumference = Math.ceil(2 * Math.PI * ((40 / 100) * 128));
  const [offSet, setOffSet] = useState(circumference);
  console.log("percentage: ", perc);
  console.log("circimference: ", circumference);
  const percentile = Math.round((perc / 100) * circumference);
  const mark = circumference - percentile;
  console.log("percentile: ", percentile);
  console.log("mark: ", mark);

  useEffect(() => {
    let offsetting = setInterval(() => {
      setOffSet((prev) => {
        if (prev === mark) {
          return prev;
        }
        return prev - 1;
      });
    }, 10);
  }, []);

  useEffect(() => {
    const setter = () => {
      if (counting > 0 && counting < 35) {
        setStroke("red");
      } else if (counting > 35 && counting < 70) {
        setStroke("yellow");
      } else if (counting > 70 && counting < 100) {
        setStroke("#86efac");
      }
    };

    setter();
  }, [offSet]);

  useEffect(() => {
    let Interval = setInterval(() => {
      setCounting((prev) => {
        if (prev >= perc) {
          return prev;
        }
        return prev + 1;
      });
    }, 100);
  }, []);

  return (
    <div
      className={`${styles.RoundContainer}  w-32 h-32 flex justify-center items-center text-center`}
    >
      <h3
        className={` font-extrabold  text-2xl`}
        style={{ color: stroke }}
      >{`${counting}%`}</h3>

      <Circle off={offSet} stroke={stroke} />
    </div>
  );
};

export default Round;
