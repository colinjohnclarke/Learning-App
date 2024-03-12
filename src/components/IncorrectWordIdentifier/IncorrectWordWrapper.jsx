import React, { useState } from "react";
import IncorrectWordText from "./IncorrectWordText";

function IncorrectWordWrapper({ data }) {

  const [correctAnswerIsSelected, setCorrectAnswerIsSelected] = useState(false);

  const [mcq1State, setMcq1State] = useState({
    correctAnswerSeleted: null,
    incorrectAnswerSelected: null,
  });
  const [mcq2State, setMcq2State] = useState({
    correctAnswerSeleted: null,
    incorrectAnswerSelected: null,
  });
  const [pointsScored, setPointsScored] = useState(0);

  const updateStateFunctions = {
    correctAnswerIsSelected,
    setCorrectAnswerIsSelected,
    pointsScored,
    setPointsScored,
    mcq1State,
    setMcq1State,
    mcq2State,
    setMcq2State,
  };

  return (
    data &&
    Array.isArray(data) &&
    data?.map((item, index) => {
      return (
        <IncorrectWordText
          updateStateFunctions={updateStateFunctions}
          key={item._key}
          data={item}
          index={index}
        ></IncorrectWordText>
      );
    })
  );
}

export default React.memo(IncorrectWordWrapper);
