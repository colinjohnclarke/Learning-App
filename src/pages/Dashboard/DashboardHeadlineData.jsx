import React, { useContext } from "react";
import AllTimeLearningTimeBox from "./Scores/AllTimeLearningTimeBox";
import AllTimeQuestionsAnsweredBox from "./Scores/AllTimeQuestionsAnsweredBox";
import AllTimeXPBox from "./Scores/AllTimeXPBox";
import { UserContext } from "../../App";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import HeaderCurve from "../../assets/svgs/HeaderCurve";
import Border from "../../components/Border";

function DashboardHeadlineData() {
  const { userData, darkThemeActive } = useContext(UserContext);
  return (
    <UserdataWrapper>
      <Border style={{ marginRight: "5px", height: "70px" }}>
        <Box darkThemeActive={darkThemeActive}>
          <AllTimeLearningTimeBox
            data={userData.user ? userData.user.totalTimeElapsed : 0}
          />
        </Box>
      </Border>

      <Border style={{ margin: "5px 5px", height: "70px" }}>
        <Box darkThemeActive={darkThemeActive}>
          <AllTimeQuestionsAnsweredBox
            data={userData.user ? userData.user.totalQuestionsAttempted : 0}
          />
        </Box>
      </Border>

      <Border style={{ marginLeft: "5px", height: "70px" }}>
        <Box darkThemeActive={darkThemeActive}>
          <AllTimeXPBox data={userData.user ? userData?.user.totalXP : 0} />
        </Box>
      </Border>
    </UserdataWrapper>
  );
}

export default DashboardHeadlineData;

const UserdataWrapper = styled.div`
  // padding-top: 10px;
  width: 100%;
  // height: 70px;
  display: flex;
  flex-direction: row;
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

  border-radius: 16px;

  p {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;
