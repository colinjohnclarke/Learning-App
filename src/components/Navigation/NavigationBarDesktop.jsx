import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";

function NavigationBarDesktop() {
  console.log("WINDOWLOCATION", window.location);

  const style = {
    padding: "10px",
    textDecoration: "none",
    fontWeight: "400",
    fontSize: "14px",
  };
  return (
    <Wrapper>
      {" "}
      <Link data-testid={"dashboard"} to={"/dashboard"} style={style}>
        Dashboard
      </Link>
      <Link data-testid={"courses"} to={"/courses"} style={style}>
        Courses
      </Link>
      <Link data-testid={"profile"} to={"/profile"} style={style}>
        Profile
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
    transition: 0.1s;
    text-decoration: underline;
  }

  @media ${device.tablet} {
    font-size: 13.5px;
    font-weight: 600;
  }
`;
