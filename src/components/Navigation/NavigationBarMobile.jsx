import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AiOutlineDashboard } from "react-icons/ai";

import { device } from "../../styles/breakpoints";
import { Link } from "react-router-dom";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { GiBookshelf } from "react-icons/gi";
import { CiSettings } from "react-icons/ci";

import { BsPerson } from "react-icons/bs";
import { UserContext } from "../../App";

function NavigationBarMobile() {
  const [navHeight, setNavHeight] = useState(50);
  const { darkThemeActive, selectedNav, setSelectedNav } =
    useContext(UserContext);



  useEffect(() => {
    if (selectedNav.Dashboard) {
      handleNavClicked("Dashboard");
    }
  }, []);

  const handleNavClicked = (nav) => {
    setSelectedNav((prevState) => ({ ...!prevState, [nav]: "true" }));
  };

  const selectedColor = "rgb(0, 250, 250)";

  const fontStyle = {
    fontSize: "10px",
  };
  const transition = { transition: "0.3s" };

  // let selectorPosition = "7.5%";

  // if (selectedNav.Dasboard) {
  //   selectorPosition = "7.5%";
  // } else if (selectedNav.Courses) {
  //   selectorPosition = "32.5%";
  // } else if (selectedNav.Profile) {
  //   selectorPosition = "57.5%";
  // } else if (selectedNav.Settings) {
  //   selectorPosition = "82.5%";
  // }

  if (selectedNav.Dashboard) {
  } else if (selectedNav.Courses) {
  }

  return (
    <Wrapper
      darkThemeActive={darkThemeActive}
      // style={{ height: `${navHeight}px` }}
    >
      {/* <Selector
        style={{ transiton: "0.3s", left: selectorPosition }}
      ></Selector> */}
      <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
        <Li onClick={() => handleNavClicked("Dashboard")}>
          <AiOutlineDashboard
            style={{ transition: "0.3s" }}
            fill={selectedNav.Dashboard ? selectedColor : "grey"}
          />
          <p
            style={{
              ...transition,
              ...fontStyle,
              color: selectedNav.Dashboard ? selectedColor : "grey",
            }}
          >
            Dashboard
          </p>
        </Li>
      </Link>
      <Link to={"/courses"} style={{ textDecoration: "none" }}>
        <Li onClick={() => handleNavClicked("Courses")}>
          <GiBookshelf fill={selectedNav.Courses ? selectedColor : "grey"} />
          <p
            style={{
              ...transition,
              ...fontStyle,
              color: selectedNav.Courses ? selectedColor : "grey",
            }}
          >
            {" "}
            Courses
          </p>
        </Li>
      </Link>
      <Link to={"/profile"} style={{ textDecoration: "none" }}>
        <Li onClick={() => handleNavClicked("Profile")}>
          <BsPerson fill={selectedNav.Profile ? selectedColor : "grey"} />
          <p
            style={{
              ...transition,
              ...fontStyle,
              color: selectedNav.Profile ? selectedColor : "grey",
            }}
          >
            Profile
          </p>
        </Li>
      </Link>

      <Link to={"/settings"} style={{ textDecoration: "none" }}>
        <Li onClick={() => handleNavClicked("Settings")}>
          <CiSettings fill={selectedNav.Settings ? selectedColor : "grey"} />
          <p
            style={{
              ...transition,
              ...fontStyle,
              color: selectedNav.Settings ? selectedColor : "grey",
            }}
          >
            Settings
          </p>
        </Li>
      </Link>
    </Wrapper>
  );
}

export default NavigationBarMobile;

const Wrapper = styled.div`
  padding-top: 3px;
  position: fixed;
  bottom: 0px;
  z-index: 500;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px -4px 4px -5px rgba(0, 0, 0, 0.75);
  transiton: 0.3s;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor};

  @media ${device.tablet} {
    // height: 50px;
    display: none;
  }
`;

const Nav = styled.nav``;

const Li = styled.li`
  // padding: 5px;
  list-style: none;
  transiton: 0.3s;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Selector = styled.div`
  height: 3px;
  width: 10%;
  background-color: rgb(0, 240, 245);
  position: absolute;
  top: 0px;
  border-radius: 10px;
  transition: 0.2s;
  left: 7%;
`;
