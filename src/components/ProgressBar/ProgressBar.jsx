import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { device } from "../../styles/breakpoints";

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  let getCurrentpercentage = useSelector(
    (state) => state.progressbarreducer.percentage
  );

  useEffect(() => {
    setProgress((val) => getCurrentpercentage.calculateProgress);
  }, [getCurrentpercentage]);

  const barStyle = {
    height: "9px",
    width: `${progress}%`,
    // width: `${50}%`,
    // width: "0%",
    borderRadius: "20px",
    background:
      "linear-gradient(225deg, rgba(0,240,240,1),  rgba(39, 106, 245, 1) 100%)",
    zIndex: "200",
    transition: "0.8s",
    maxWidth: "60vw",
  };

  return <Wrapper>{<Bar style={barStyle}></Bar>}</Wrapper>;
}

export default ProgressBar;

const Wrapper = styled.div`
  position: relative;
  z-index: 0;
  max-width: 65vw;
  width: 65vw;
  height: 9px;
  // min-width: 60%;
  border-radius: 20px;
  background: rgb(223, 223, 223);
  background: linear-gradient(
    345deg,
    rgba(0xw, 223, 223, 1) 0%,
    rgba(132, 137, 138, 0.8926164215686274) 100%
  );

  @media ${device.tablet} {
    height: 9px;
  }
`;

const Bar = styled.div``;
