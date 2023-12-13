import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsActivity } from "react-icons/bs";
import { device } from "../../styles/breakpoints";
import { Link } from "react-router-dom";

import {
  GiBookshelf,
  GiPlantsAndAnimals,
  GiMaterialsScience,
} from "react-icons/gi";
import { IoMdNotificationsOutline, IoEarthSharp } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { IconContext } from "react-icons";
import { FaBeer } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { BsPerson } from "react-icons/bs";

function NavigationBarMobile({ navState }) {
  const [scrollDistance, setScrollDistance] = useState(0);
  const [navHeight, setNavHeight] = useState(50);

  useEffect(() => {
    const handleScroll = () => {
      const distance = window.pageYOffset || 0;
      setScrollDistance((val) => distance);
      setNavHeight(Math.max(50 - distance * 0.5));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { selectedNav, setSelectedNav } = navState;

  const handleNavClicked = (nav) => {
    setSelectedNav((prevState) => ({ ...!prevState, [nav]: "true" }));
  };

  useEffect(() => {
    handleNavClicked("Dashboard");
  }, []);

  // useEffect(() => {
  //   if (selectedNav.Courses === "true") {
  //     handleNavClicked("Courses");
  //   }

  //   handleNavClicked("Dashboard");
  // }, [selectedNav]);

  const selectedColor = "rgb(0, 250, 250)";

  const fontStyle = {
    fontSize: "10px",
    transition: "0.3s",
  };
  const transition = { transition: "0.3s" };

  let selectorPosition = "7%";

  if (selectedNav.Dasboard) {
    selectorPosition = "7%";
  } else if (selectedNav.Courses) {
    selectorPosition = "32%";
  } else if (selectedNav.Profile) {
    selectorPosition = "58%";
  } else if (selectedNav.Settings) {
    selectorPosition = "83%";
  }

  return (
    <Wrapper style={{ height: `${navHeight}px` }}>
      <Selector
        style={{ transiton: "0.3s", left: selectorPosition }}
      ></Selector>
      <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
        <Li onClick={() => handleNavClicked("Dashboard")}>
          <AiOutlineDashboard
            style={{ transition: "0.3s" }}
            fill={selectedNav.Dashboard ? selectedColor : ""}
          />
          <p
            style={{
              ...transition,
              ...fontStyle,
              color: selectedNav.Dashboard ? selectedColor : "black",
            }}
          >
            Dashboard
          </p>
        </Li>
      </Link>
      <Link to={"/courses"} style={{ textDecoration: "none" }}>
        <Li onClick={() => handleNavClicked("Courses")}>
          <GiBookshelf fill={selectedNav.Courses ? selectedColor : ""} />
          <p
            style={{
              ...transition,
              ...fontStyle,
              color: selectedNav.Courses ? selectedColor : "",
            }}
          >
            {" "}
            Courses
          </p>
        </Li>
      </Link>
      <Link to={"/profile"} style={{ textDecoration: "none" }}>
        <Li onClick={() => handleNavClicked("Profile")}>
          <BsPerson fill={selectedNav.Profile ? selectedColor : ""} />
          <p
            style={{
              ...transition,
              ...fontStyle,
              color: selectedNav.Profile ? selectedColor : "",
            }}
          >
            Profile
          </p>
        </Li>
      </Link>

      <Link to={"/settings"} style={{ textDecoration: "none" }}>
        <Li onClick={() => handleNavClicked("Settings")}>
          <CiSettings fill={selectedNav.Settings ? selectedColor : ""} />
          <p
            style={{
              ...transition,
              ...fontStyle,
              color: selectedNav.Settings ? selectedColor : "",
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
  color: black;

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
