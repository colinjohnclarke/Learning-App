import React from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";

function Signup() {
  return (
    <Wrapper>
      <p style={{ fontSize: "10px", fontWeight: "400", textAlign: "center" }}>
        Sign-up
      </p>
    </Wrapper>
  );
}

export default Signup;

const Wrapper = styled.button`
  color: blue;
  border: none;
  height: 30px;
  background-color: white;
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 3px;
  box-shadow: rgba(0, 200, 200, 0.15) 0px 1px 2px 3px;
  text-size: 15px;
  text-align: center;
  transition: 0.3s;
  margin: 10px;

  @media ${device.mobileL} {
    margin-right: 20px;
  }
  @media ${device.tablet} {
    margin-right: 30px;
  }
  @media ${device.laptop} {
    margin-right: 40px;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: rgba(0, 200, 200, 0.15) 0px 3px 3px 3px;
    background-color: rgb(0, 200, 200, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;
