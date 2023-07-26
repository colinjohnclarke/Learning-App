import React from "react";
import styled from "styled-components";
import CloseDrawerBtn from "./CloseDrawerBtn";
import { AiOutlineHome } from "react-icons/ai";

function DrawerHeader() {
  return (
    <Wrapper>
      <AiOutlineHome style={{ padding: "10px" }}></AiOutlineHome>
      <p>SPS online</p>
      <CloseDrawerBtn></CloseDrawerBtn>
    </Wrapper>
  );
}

export default DrawerHeader;

const Wrapper = styled.div`
  min-height: 50px;
  height: 5%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
