import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineMenuFold } from "react-icons/ai";
import { GiCook, GiMuscleUp, GiNewspaper } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";

import { RxHamburgerMenu } from "react-icons/rx";
import { RiMenuFoldLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerIsOpen } from "../../features/Drawer/DrawerSlice";

function OpenDrawerBtn() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.drawerSlice.value);

  const openStyle = {
    transform: "rotate(180deg)",
    transition: "0.6s",
    padding: "10px",
  };

  let style = {};

  if (isOpen) {
    style = openStyle;
  }

  const handleClick = () => {
    dispatch(setDrawerIsOpen());
   
  };

  return (
    <OpenDrawer>
      <RxHamburgerMenu style={style} onClick={handleClick}></RxHamburgerMenu>
    </OpenDrawer>
  );
}

export default OpenDrawerBtn;

const OpenDrawer = styled.button`
  color: blue;
  border: none;
  min-height: 30px;
  height: 7%;
  background-color: white;
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);

  text-size: 15px;
  text-align: center;
  transition: 0.3s;
  // margin: 2px;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;
