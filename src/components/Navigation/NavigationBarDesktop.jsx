import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import { IoIosArrowDropdown } from "react-icons/io";

function NavigationBarDesktop() {
  const { userData } = useContext(UserContext);
  const [color, setColor] = useState("");

  let selectedFontColor = "rgb(0, 250, 250)";

  const changeFontColortoSelected = () => {
    setColor((val) => selectedFontColor);
  };

  const changeFontColortoUNSelected = () => {
    setColor((val) => "");
  };

  return (
    <Wrapper>
      {" "}
      <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
        <DashLink>
          <P>Dashboard</P>
        </DashLink>
      </Link>
      <Link to={"/courses"} style={{ textDecoration: "none" }}>
        <DashLink>
          <P>Courses</P>
        </DashLink>
      </Link>
      <Link to={"/profile"} style={{ textDecoration: "none" }}>
        <DashLink>
          <P>Profile</P>
        </DashLink>
      </Link>
      <Link
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
            <P>{userData?.user.firstName}</P>
            <IoIosArrowDropdown fill={color} />
          </div>
        </DashLink>
      </Link>
    </Wrapper>
  );
}

export default NavigationBarDesktop;

const DashLink = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  text=decoration: none;
`;

const Wrapper = styled.div`
  display: none;
  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    right: 0px;
    /* width: 50%; */
  }
`;

const P = styled.p`
  font-size: 12px;
  font-weight: 600;

  &:hover {
    color: rgb(0, 240, 240);
    transition: 0.1s;
    text=decoration: underline;
  }

  @media ${device.tablet} {
    font-size: 13.5px;
    font-weight: 600;
  }
`;
