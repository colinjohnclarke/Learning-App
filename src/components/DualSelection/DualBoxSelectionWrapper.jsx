import React, { useState } from "react";
import { DualSelectionContext } from "./DualSelectionContext";
import DualBoxSelection from "./DualBoxSelection";

function DualSelectionWrapper({data}) {


  const [index0AnswerisCorrect, setIndex0AnswerisCorrect] = useState(false);
  const [index0AnswerisInCorrect, setIndex0AnswerisInCorrect] = useState(false);
  const [index1AnswerisCorrect, setIndex1AnswerisCorrect] = useState(false);
  const [index1AnswerisInCorrect, setIndex1AnswerisInCorrect] = useState(false);

  const contextObj = {
    index0AnswerisCorrect,
    setIndex0AnswerisCorrect,
    index0AnswerisInCorrect,
    setIndex0AnswerisInCorrect,
    index1AnswerisCorrect,
    setIndex1AnswerisCorrect,
    index1AnswerisInCorrect,
    setIndex1AnswerisInCorrect,
  };

  return data?.map((item, index) => {
    return (
      <DualSelectionContext.Provider value={contextObj}>
        <DualBoxSelection key={item._key} index={index} data={item} />
      </DualSelectionContext.Provider>
    );
  });
}

export default DualSelectionWrapper;
