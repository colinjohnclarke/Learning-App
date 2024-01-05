import React, { useContext } from "react";
import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerIsOpen } from "../../features/Drawer/DrawerSlice";
import { UserContext } from "../../App";

import { ThemeStyles } from "../../styles/ThemeStyles";

import { IoIosMenu } from "react-icons/io";

function OpenDrawerBtn() {
  const dispatch = useDispatch();

  const { darkThemeActive } = useContext(UserContext);

  const isOpen = useSelector((state) => state.drawerSlice.value);

  const openStyle = {
    transform: "rotate(180deg)",
    transition: "0.5s",
    padding: "10px",
    height: "40px",
  };

  let style = {};

  if (isOpen) {
    style = openStyle;
  }

  const handleClick = () => {
    dispatch(setDrawerIsOpen());
  };

  return (
    <OpenDrawer darkThemeActive={darkThemeActive} onClick={handleClick}>
      <IoIosMenu
        fill={
          darkThemeActive
            ? ThemeStyles.lightThemePrimaryFrontColor
            : ThemeStyles.darkThemePrimaryFontColor
        }
        style={style}
      ></IoIosMenu>
    </OpenDrawer>
  );
}

export default OpenDrawerBtn;

const OpenDrawer = styled.button`
  border: none;
  min-height: 30px;
  height: 7%;
  width: 60px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  border-radius: 50%;
  text-size: 15px;
  text-align: center;

  // margin: 2px;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;
