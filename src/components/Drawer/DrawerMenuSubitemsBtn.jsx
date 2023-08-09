import React, { useEffect, useState } from "react";
import { subjects, menuItems } from "./DummyData";
import styled from "styled-components";
import "animate.css";

function DrawerMenuSubItemsBtn(props) {
  const [buttonstyle, setButtonStyle] = useState({});

  const menuitemclicked = props.menuitemclicked;

  const displayStyle = {
    height: "50px",
  };
  const hideStyle = {
    height: "50px",
    // transform: "translateX(-300px)",
  };

  useEffect(() => {
    if (menuitemclicked) {
      setButtonStyle((val) => displayStyle);
    } else setButtonStyle((val) => hideStyle);
  }, [menuitemclicked]);

  const name = props.name;

  const hoverstyle = {
    width: "100%",
    background:
      "linear-gradient(225deg, rgba(49,255,54,1) 0%, rgba(0,200,200,1) 100%)",
    fontWeight: "400",
    color: "white",
    transition: "0.3s",
    paddingLeft: "100px",
    fontWeight: "500",
    justifyContent: "space-between",
  };

  const normalstyle = {
    // justifyContent: "space-between",
    transition: "0.3s",
  };

  const onEnter = () => {
    setButtonStyle((val) => hoverstyle);
  };

  const onLeave = () => {
    setButtonStyle((val) => normalstyle);
  };

  return (
    <MenuItemsButton
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={buttonstyle}
    >
      {[name]}
    </MenuItemsButton>
  );
}

export default DrawerMenuSubItemsBtn;

const MenuItemsButton = styled.li`
  height: 50px;
  fontweight: 400;
  transition: 0.3s;
  padding-left: 80px;
  fontweight: 400;
  display: flex;
  flex-direction: row;
  justif-content: flex-start;
  align-items: center;
  background-color: white;
  width: 100%;
  background: linear-gradient(
    225deg,
    rgba(49, 255, 54, 0.3) 0%,
    rgba(0, 200, 200, 0.3) 100%
  );
`;
