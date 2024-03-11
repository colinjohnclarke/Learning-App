import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { UserContext } from "../../../App";
import { DiRubyRough } from "react-icons/di";
import FlameDayStreak from "../../../components/DayStreak/FlameDayStreak";

function UserProgressData() {
  const { userData, darkThemeActive } = useContext(UserContext);

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <div
        darkThemeActive={darkThemeActive}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          color: darkThemeActive
            ? ThemeStyles.lightThemePrimaryFrontColor
            : ThemeStyles.darkThemePrimaryFontColor,
        }}
      >
        {" "}
        {userData?.user.totalXP}{" "}
        <DiRubyRough style={{}} size={30} fill="rgb(138,43,226)" />
      </div>

      {/* <div style={{ width: "10px" }}></div> */}
      <FlameDayStreak />
    </Wrapper>
  );
}

export default UserProgressData;

const Wrapper = styled.div`
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;
