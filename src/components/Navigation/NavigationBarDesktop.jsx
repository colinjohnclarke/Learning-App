import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";

function NavigationBarDesktop() {
  const { darkThemeActive } = useContext(UserContext);

  const style = {
    textDecoration: "none",
  };
  return (
    <Wrapper>
      {" "}
      <Link data-testid={"dashboard"} to={"/dashboard"} style={style}>
        <P>Dashboard</P>
      </Link>
      <Link data-testid={"courses"} to={"/courses"} style={style}>
        <P>Courses</P>
      </Link>
      <Link data-testid={"profile"} to={"/profile"} style={style}>
        <P>Profile</P>
      </Link>
    </Wrapper>
  );
}

export default NavigationBarDesktop;

const Wrapper = styled.div`
  display: none;
  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    left: 70px;
    /* width: 50%; */
  }
`;

const P = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin: 10px;

  &:hover {
    color: rgb(0, 240, 240);
    transition: 0.2s;
    text-decoration: underline;
  }

  @media ${device.tablet} {
    font-size: 13px;
    font-weight: 400;
  }
`;
