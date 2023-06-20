import React from "react";
import GapFillWrapper from "./GapFillWrapper";
import styled from "styled-components";

function GapFill(props) {
  const data = props.data;
  console.log("GAP PROPS", data);

  return (
    <GapFillMain>
      {data?.map((item, index) => (
        <GapFillWrapper
          key={item._key}
          index={index}
          item={item}
        ></GapFillWrapper>
      ))}
    </GapFillMain>
  );
}

export default GapFill;

const GapFillMain = styled.div``;
