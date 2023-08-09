import React, { useState, useEffect } from "react";
import "animate.css";

function AnimateCountFunction(maxNumber) {
  const [points, setPoints] = useState(Math.floor(maxNumber));
  const [counter, setCounter] = useState(0);
  const [counterinterval, setCounterInterval] = useState(50);

  const [animateclass, setAnimateClass] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((val) => val + 1);
    }, counterinterval);

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
      setAnimateClass("animate__animated animate__jello");
    }

    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  return { counter, animateclass };
}

export default AnimateCountFunction;
