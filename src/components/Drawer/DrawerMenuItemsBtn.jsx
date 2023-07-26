import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GrNext } from "react-icons/gr";
import DrawerMenuSubItemsBtn from "../Drawer/DrawerMenuSubitemsBtn";

function DrawerMenuItemsBtn(props) {
  const [buttonstyle, setButtonStyle] = useState({});

  const [menuitemclicked, setMenuItemClicked] = useState(undefined);
  const [hoveritemisactive, setHoverItemisActive] = useState(false);
  const [arrowiconstyle, setArrowIconStyle] = useState({
    // display: "none",
  });
  const [scrollheight, setScrollHeight] = useState(0);

  const name = props.name;
  const icon = props.icon;
  const blocks = props.blocks;
  const getBlockNum = blocks?.length;
  let showSubjectsBlockHeight = getBlockNum * 50;

  const hoverstyle = {
    width: "100%",
    background:
      "linear-gradient(225deg, rgba(49,255,54,1) 0%, rgba(0,200,200,1) 100%)",
    fontWeight: "800",
    color: "white",
    transition: "0.3s",
    paddingLeft: "12px",
    justifyContent: "space-between",
  };

  let iconStyleDisplay = {
    transition: "0.3s",
    transform: "rotate(90deg)",
    padding: "5px",
    borderRadius: "50%",
    margin: "30px",
    boxShadow: "rgba(0, 0, 0, 0.09) 0px 0px 80px 20px",
  };

  let iconStyleRotate = {
    transition: "0.3s",
    transform: "rotate(270deg)",
    padding: "5px",
    borderRadius: "50%",
    margin: "30px",
    boxShadow: "rgba(0, 0, 0, 0.09) 0px 0px 80px 20px",
  };

  let iconStyleHide = {
    display: "none",
  };

  useEffect(() => {
    if (menuitemclicked && hoveritemisactive) {
      setScrollHeight((val) => showSubjectsBlockHeight);
      setArrowIconStyle((val) => iconStyleRotate);
    } else if (!menuitemclicked) {
      setScrollHeight((val) => 0);
      setArrowIconStyle((val) => iconStyleDisplay);
    }
  }, [menuitemclicked]);

  useEffect(() => {
    if (!hoveritemisactive) {
      setArrowIconStyle((val) => iconStyleHide);
    }
  }, [hoveritemisactive]);

  const onEnter = () => {
    setButtonStyle((val) => hoverstyle);
    setArrowIconStyle((val) => iconStyleDisplay);
    setHoverItemisActive((val) => true);
  };

  const onLeave = () => {
    setButtonStyle((val) => {});
    setArrowIconStyle((val) => iconStyleHide);
    setHoverItemisActive((val) => false);
  };

  return (
    <Container>
      <Wrapper
        onClick={() => {
          setMenuItemClicked((val) => !val);
        }}
      >
        <MenuItemsButton
          style={buttonstyle}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              fontWeight: "500",
            }}
          >
            {icon}
            {[name]}
          </div>

          <GrNext style={arrowiconstyle} />
        </MenuItemsButton>
      </Wrapper>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          listStyle: "none",
          padding: "0",
          margin: "0",
          maxHeight: scrollheight + "px",
          transition: "0.3s",
          width: "100%",
        }}
      >
        {blocks?.map((item, index) => {
          return (
            <DrawerMenuSubItemsBtn
              index={index}
              menuitemclicked={menuitemclicked}
              name={item.block}
            ></DrawerMenuSubItemsBtn>
          );
        })}
      </ul>
    </Container>
  );
}

export default DrawerMenuItemsBtn;

const MenuItemsButton = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  border: none;
  transition: 0.1s;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Container = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
