import React from "react";
import styled from "styled-components";

function NextBlock() {
  return (
    <Wrapper>
      <h3>Next Block...</h3>
    </Wrapper>
  );
}

export default NextBlock;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 16px;
  position: relative;
  z-index: 0;
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
`;
