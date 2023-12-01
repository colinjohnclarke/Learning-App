import React, { useEffect, useState } from "react";

import DualBoxSelection from "./DualBoxSelection";

function DualSelectionWrapper({ data }) {
  const [correctAnswerIsSelected, setCorrectAnswerIsSelected] = useState(false);
  const [incorrectAnswerIsSelected, setIncorrectAnswerIsSelected] =
    useState(false);

  // store bools in array when a correct box is selected and measure length to check if all are correct
  const [arrayOfBoolsFromCorrect, setArrayOfBoolsFromCorrect] = useState([]);
  //

  const updateStateFunctions = {
    correctAnswerIsSelected,
    setCorrectAnswerIsSelected,
    incorrectAnswerIsSelected,
    setIncorrectAnswerIsSelected,
    arrayOfBoolsFromCorrect,
    setArrayOfBoolsFromCorrect,
  };

  useEffect(() => {
    if (arrayOfBoolsFromCorrect.length === data[0].number_of_pairs_entered) {
      setCorrectAnswerIsSelected((val) => true);
    }
  }, [arrayOfBoolsFromCorrect.length]);

  return data?.map((item, index) => {
    return (
      <DualBoxSelection
        updateStateFunctions={updateStateFunctions}
        key={item._key}
        index={index}
        data={item}
      />
    );
  });
}

export default React.memo(DualSelectionWrapper);
