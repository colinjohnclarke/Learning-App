import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import SettingsBtnHeaderBar from "../Settings/SettingsBtnHeaderBar/SettingsBtnHeaderBar";

function NavigationBarDesktop() {
  return (
    <Wrapper>
      {" "}
      <Link
        to={"/dashboard"}
        style={{
          textDecoration: "none",
        }}
      >
        <P>Dashboard</P>
      </Link>
      <Link to={"/courses"} style={{ textDecoration: "none" }}>
        <P>Courses</P>
      </Link>
      <Link to={"/profile"} style={{ textDecoration: "none" }}>
        <P>Profile</P>
      </Link>
      {/* <Link
        to={"/settings"}
        style={{
          textDecoration: "none",
        }}
      >
        <DashLink>
          <div
            onMouseOver={() => changeFontColortoSelected()}
            onMouseLeave={() => changeFontColortoUNSelected()}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
    
          </div>
        </DashLink>
      </Link> */}
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
