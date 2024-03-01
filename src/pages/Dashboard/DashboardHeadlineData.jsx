import React, { useContext } from "react";
import AllTimeLearningTimeBox from "./Scores/AllTimeLearningTimeBox";
import AllTimeQuestionsAnsweredBox from "./Scores/AllTimeQuestionsAnsweredBox";
import AllTimeXPBox from "./Scores/AllTimeXPBox";
import { UserContext } from "../../App";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";

function DashboardHeadlineData() {
  const { userData, darkThemeActive } = useContext(UserContext);
  return (
    <UserdataWrapper>
      <Box darkThemeActive={darkThemeActive} style={{ marginRight: "5px" }}>
        <AllTimeLearningTimeBox
          data={userData.user ? userData.user.totalTimeElapsed : 0}
        />
      </Box>
      <Box darkThemeActive={darkThemeActive} style={{ margin: "5px 5px" }}>
        <AllTimeQuestionsAnsweredBox
          data={userData.user ? userData.user.totalQuestionsAttempted : 0}
        />
      </Box>
      <Box darkThemeActive={darkThemeActive} style={{ marginLeft: "5px" }}>
        <AllTimeXPBox data={userData.user ? userData?.user.totalXP : 0} />
      </Box>
    </UserdataWrapper>
  );
}

export default DashboardHeadlineData;

const UserdataWrapper = styled.div`
  // padding-top: 10px;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  // max-width: 500px;

  @media ${device.tablet} {
    // width: 50%;
    // transition: 0s;
  }
`;

const Box = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  border-radius: 5px;
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  p {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;
