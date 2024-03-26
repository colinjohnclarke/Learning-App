import React, { useState, useEffect } from "react";
import "animate.css";

function AnimateCountFunction(maxNumber) {
  const [points, setPoints] = useState(maxNumber);
  const [counter, setCounter] = useState(0);
  const [counterinterval, setCounterInterval] = useState(2);
  const [animateclass, setAnimateClass] = useState("");

  let timer;

  useEffect(() => {
    if (points > 0) {
      timer = setInterval(() => {
        if (points > 500) {
          setCounter((val) => val + 10);
        } else if (points > 500) {
          setCounter((val) => val + 5);
        } else if (points > 100) {
          setCounter((val) => val + 1);
        } else {
          setCounter((val) => val + 1);
        }
      }, counterinterval);

      if (counter > points) {
        clearInterval(timer);
      }

      if (counter === points - 1000) {
        setCounterInterval((val) => 1);
      }

      if (counter === points - 50) {
        setCounterInterval((val) => 20);
      }

      if (counter === points - 20) {
        setCounterInterval((val) => 50);
      }

      if (counter === points - 10) {
        setCounterInterval((val) => 100);
      }
      if (counter === points - 5) {
        setCounterInterval((val) => 250);
      }
      if (counter === points - 2) {
        setCounterInterval((val) => 400);
      }

      if (counter === points) {
        clearInterval(timer);
        setAnimateClass("animate__animated animate__tada");
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  return { counter, animateclass };
}

export default AnimateCountFunction;
