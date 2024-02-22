// import React, { useState, useEffect } from "react";
// import { menuItems } from "./DummyData";
// import styled from "styled-components";
// import DrawerMenuItemsBtn from "./DrawerMenuItemsBtn";
// import { useSelector } from "react-redux";

// function DrawerItems() {
//   const [anmateclass, setAnimateClass] = useState("");
//   const drawerIsOpen = useSelector((state) => state.drawerSlice.value);

//   useEffect(() => {
//     if (drawerIsOpen) {
//       setAnimateClass("animate__animated animate__zoomIn animate__faster");
//     } else if (!drawerIsOpen) {
//       setAnimateClass("");
//     }
//   }, [drawerIsOpen]);

//   const mapFuntionSubjects = menuItems?.map((item, index) => {
//     return (
//       <li
//         key={index}
//         className={anmateclass}
//         style={{
//           listStyle: "none",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "flex-start",
//           width: "100%",
//           padding: "0",
//           margin: "0",
//           animationDelay: `${index / 10}s`,
//           overflow: "none",
//         }}
//       >
//         <DrawerMenuItemsBtn
//           icon={item.icon}
//           name={item.name}
//         ></DrawerMenuItemsBtn>
//       </li>
//     );
//   });

//   return <Wrapper>{mapFuntionSubjects} </Wrapper>;
// }

// export default DrawerItems;

// const Wrapper = styled.div`
//   height: 100%;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   //   justify-content: space-between;
//   align-items: center;
// `;
