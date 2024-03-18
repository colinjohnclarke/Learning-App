import React, { useContext } from "react";
import { UserContext } from "../../../App";
import XPPointsScoredToday from "./XPPointsScoredToday";
import AnimatedPercentageScore from "../../../pages/Dashboard/AnimatedPercentageScore";

function XPRemainingToCompleteGoal() {
  const { darkThemeActive, userData } = useContext(UserContext);

  const XP = XPPointsScoredToday();

  const percentageGoalCompleted =
    (XP / userData?.user.preferences.personalizedSettings.dailyXPGoal) * 100;

  return (
    <div>
      <AnimatedPercentageScore
        percentage={percentageGoalCompleted}
        color="rgb(0, 245, 245)"
      ></AnimatedPercentageScore>
    </div>
  );
}

export default XPRemainingToCompleteGoal;
