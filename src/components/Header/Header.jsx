import React, { useContext } from "react";
import styled from "styled-components";
import ProgressBar from "../ProgressBar/ProgressBar";
import OpenDrawerBtn from "../Drawer/OpenDrawerBtn";
import Signup from "../Buttons/Signup";
import LogoutBtn from "../Login/LogoutBtn";
import { device } from "../../styles/breakpoints";
import SettingsBtnHeaderBar from "../Settings/SettingsBtnHeaderBar/SettingsBtnHeaderBar";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import ExitCurrentCourseBtn from "./ExitCurrentCourseBtn";

// function Header() {
//   const { darkThemeActive } = useContext(UserContext);
//   return (
//     <Wrapper>
//       <OpenDrawerBtn></OpenDrawerBtn>
//       <ProgressBar></ProgressBar>
//       <SettingsBtnHeaderBar />
//       {/* <Signup></Signup> */}
//       {/* <LogoutBtn></LogoutBtn>

//       <div>hdjshjs</div> */}
//     </Wrapper>
//   );
// }

// export default Header;

// const Wrapper = styled.div`
//   height: 50px;
//   background-color: white;
//   background-color: ${(props) => (props.darkThemeActive ? "white" : "black")};
//   width: 100vw;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   background-color: rgb(255, 255, 255);
//   box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
//   position: fixed;
//   z-index: 100;

//   @media ${device.tablet} {
//     height: 60px;
//   }
// `;

function Header() {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      {/* <OpenDrawerBtn></OpenDrawerBtn> */}
      <ExitCurrentCourseBtn />
      <ProgressBar></ProgressBar>

      <SettingsBtnHeaderBar />
      {/* <Signup></Signup> */}
      {/* <LogoutBtn></LogoutBtn>

      <div>hdjshjs</div> */}
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  height: 50px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
  position: fixed;
  z-index: 100;

  @media ${device.tablet} {
    height: 60px;
  }
`;
