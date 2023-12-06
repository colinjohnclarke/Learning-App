import React from "react";
import styled from "styled-components";

function NavigationBarMobile() {
  return (
    <Wrapper>
      <Nav>Dashboard</Nav>
      <Nav> Courses</Nav>
      <Nav>Profile</Nav>
    </Wrapper>
  );
}

export default NavigationBarMobile;

const Wrapper = styled.nav`
  position: fixed;
  z-index: 200;
  width: 100%;
  height: 80px;
  background-color: grey;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Nav = styled.nav``;
