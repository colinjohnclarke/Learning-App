import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  let getCurrentpercentage = useSelector(
    (state) => state.progressbarreducer.value
  );

  useEffect(() => {
    setProgress((val) => getCurrentpercentage?.payload?.calculateProgress);
  }, [getCurrentpercentage]);

  const barStyle = {
    height: "8px",
    width: `${progress}%`,
    // width: "0%",
    borderRadius: "20px",
    background:
      "linear-gradient(225deg, rgba(49,255,54,1) 0%, rgba(0,200,200,1) 100%)",
    zIndex: "200",
    transition: "2s",
  };

  return (
    <Wrapper>
      <Bar style={barStyle}></Bar>
    </Wrapper>
  );
}

export default ProgressBar;

const Wrapper = styled.div`
  height: 8px;
  min-width: 60%;
  border-radius: 20px;
  background: rgb(223, 223, 223);
  background: linear-gradient(
    345deg,
    rgba(223, 223, 223, 1) 0%,
    rgba(132, 137, 138, 0.8926164215686274) 100%
  );
`;

const Bar = styled.div``;
