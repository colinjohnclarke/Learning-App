// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import styled from "styled-components";
// import DrawerHeader from "./DrawerHeader";
// import DrawerItems from "./DrawerItems";
// import Subjects from "./Subjects/Subjects";
// import { setDrawerIsOpen } from "../../features/Drawer/DrawerSlice";

// function Drawer() {
//   const drawerIsOpen = useSelector((state) => state.drawerSlice.value);

//   const [drawerstyle, setDrawerStyle] = useState([]);
//   const [overlaystyle, setOverlayStyle] = useState([]);

//   const dispatch = useDispatch();

//   const opendrawerStyle = {
//     width: "320px",
//     transition: "0.4s",
//     left: "0vw",
//     position: "fixed",
//   };

//   const closeddrawerStyle = {
//     left: "-55vw",
//     transition: "0.6s",
//     width: "0vw",
//   };

//   let displayOverlay = {
//     height: "1000vh",
//     width: "1000vh",
//     backgroundColor: "rgb(0, 0, 0, 0.6)",
//     position: "fixed",
//     zIndex: "10",
//     transition: "1s",
//   };

//   let hideOverlay = {
//     left: "-50vw",
//     position: "fixed",
//     zIndex: "10",
//     transition: "1s",
//   };

//   useEffect(() => {
//     if (drawerIsOpen) {
//       setDrawerStyle((val) => opendrawerStyle);
//       setOverlayStyle((val) => displayOverlay);
//     } else {
//       setDrawerStyle((val) => closeddrawerStyle);
//       setOverlayStyle((val) => hideOverlay);
//     }
//   }, [drawerIsOpen]);

//   return (
//     <div>
//       <Wrapper style={drawerstyle}>
//         <DrawerHeader></DrawerHeader>

//         <ul style={{ listStyle: "square", margin: "0", padding: "0" }}>
//           <DrawerItems />
//         </ul>

//         <div
//           style={{
//             height: "2px",
//             width: "100%",
//             background:
//               "linear-gradient(225deg, rgba(49,255,54,1) 0%, rgba(0,200,200,1) 100%)",
//           }}
//         ></div>

//         <ul style={{ listStyle: "square", margin: "0", padding: "0" }}>
//           <Subjects />
//         </ul>
//       </Wrapper>

//       <OverLay
//         onClick={() => dispatch(setDrawerIsOpen())}
//         style={overlaystyle}
//       ></OverLay>
//     </div>
//   );
// }

// export default Drawer;

// const Wrapper = styled.div`
//   // width: 60vw;
//   height: 100%;
//   position: fixed;
//   z-index: 200;
//   background-color: white;
//   transition: 0.6s;
//   overflow-y: scroll;
// `;

// const OverLay = styled.div``;
