import React from "react";
import styled from "styled-components";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerIsOpen } from "../../features/Drawer/DrawerSlice";
import { RxHamburgerMenu } from "react-icons/rx";

function CloseDrawerBtn() {
  const isOpen = useSelector((state) => state.drawerSlice.value);

  const closeStyle = {
    transform: "rotate(180deg)",
    transition: "0.7s",
  };

  const openStyle = {
    transform: "rotate(360deg)",
    transition: "0.7s",
  };

  let style = {};

  if (!isOpen) {
    style = closeStyle;
  } else style = openStyle;

  const dispatch = useDispatch();

  return (
    <CloseDrawer>
      <RxHamburgerMenu
        style={style}
        onClick={() => {
          dispatch(setDrawerIsOpen());
        }}
      ></RxHamburgerMenu>
    </CloseDrawer>
  );
}

export default CloseDrawerBtn;

const CloseDrawer = styled.button`
  border: none;
  background-color: white;
  padding: 30px;
  display: block;
`;
