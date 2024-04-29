import React from "react";
import { useContext } from "react";
import { UserContext } from "../../../../App";

function CalculateXP(lesson) {
  const { userData } = useContext(UserContext);

  const quizScores = userData?.user.quizScores?.filter(
    (quizScore) => quizScore.blockName === lesson.name
  );

  let topicXpScored = 0;

  quizScores.forEach((score) => {
    return (topicXpScored += score.XPScored || 0);
  });

  return topicXpScored;
}

export default CalculateXP;
