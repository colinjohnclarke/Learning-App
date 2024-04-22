import React, { useContext } from "react";
import { UserContext } from "../../../App";
import XPPointsScoredToday from "./XPPointsScoredToday";
import AnimatedPercentageScore from "../../../pages/Dashboard/AnimatedPercentageScore/AnimatedPercentageScore";
import AnimatedSuccessIcon from "../../../assets/animations/AnimatedSuccessIcon";

function XPRemainingToCompleteGoal() {
  const { darkThemeActive, userData } = useContext(UserContext);

  const XP = XPPointsScoredToday();

  const percentageGoalCompleted =
    (XP / userData?.user.preferences.personalizedSettings.dailyXPGoal) * 100;

  return (
    <div>
      {" "}
      {percentageGoalCompleted < 100 ? (
        <AnimatedPercentageScore
          size="large"
          percentage={percentageGoalCompleted}
          color="rgb(0, 245, 245)"
        ></AnimatedPercentageScore>
      ) : (
        <AnimatedSuccessIcon></AnimatedSuccessIcon>
      )}
    </div>
  );
}

export default XPRemainingToCompleteGoal;
