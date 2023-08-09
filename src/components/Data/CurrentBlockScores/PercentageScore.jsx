import React, { useState, useEffect } from "react";
import "animate.css";
import ContinueBtn from "../../Buttons/ContinueBtn";
import styled from "styled-components";

function PercentageScore(props) {
  const [val, setVal] = useState(0);
  const [textColor, setTextColor] = useState("");
  const [textColorCount, setTextColorCount] = useState(0);

  const [animateclass, setAnimateClass] = useState("");

  const percentage = Math.floor(props.percentage);

  const intervalbetweenCounts = 2000 / percentage;

  useEffect(() => {
    const timer = setInterval(() => {
      setVal((val) => val + 1);
      setTextColorCount(val);
    }, intervalbetweenCounts);

    if (val === percentage) {
      clearTimeout(timer);
      setAnimateClass((val) => "animate__animated animate__tada");
    }

    return () => clearInterval(timer);
  }, [val, intervalbetweenCounts]);

  return (

      <p
        style={{
          fontWeight: "600",
          fontSize: "1.2rem",
          color: textColor,
          transition: "0.2s",
        }}
        className={animateclass}
      >
        {val} %
      </p>
   

  );
}

export default PercentageScore;


