import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { subjects } from "../DummyData";
import DrawerMenuItemsBtn from "../DrawerMenuItemsBtn";

import "animate.css";
import { useSelector } from "react-redux";
import { GrNext } from "react-icons/gr";

function Subjects() {
  const [anmateclass, setAnimateClass] = useState("");
  const [menuitemclicked, setMenuItemClicked] = useState(false);

  const drawerIsOpen = useSelector((state) => state.drawerSlice.value);

  useEffect(() => {
    if (drawerIsOpen) {
      setAnimateClass("animate__animated animate__fadeInLeftBig animate__fast");
    } else if (!drawerIsOpen) {
      setAnimateClass("");
    }
  }, [drawerIsOpen]);

  const data = subjects.map((item, index) => {
    return (
      <ul
        className={anmateclass}
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0px",
          margin: "0px",
          animationDelay: `-${index / 20}s`,
          transition: "1s",
          backgroundColor: "white",
        }}
      >
        <DrawerMenuItemsBtn
          icon={item.icon}
          name={item.name}
          blocks={item.blocks}
          menuitemclicked={menuitemclicked}
        ></DrawerMenuItemsBtn>
      </ul>
    );
  });

  return [data];
}

export default Subjects;
