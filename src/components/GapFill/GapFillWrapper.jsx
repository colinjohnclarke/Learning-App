import React, { useState } from "react";
import GapFill from "./GapFill";

import { GapFillContext } from "./GapFillContext";

function GapFillWrapper(props) {
  const data = props.data;

  const [index0answeriscorrect, setindex0AnswerisCorrect] = useState(false);
  const [index1AnswerisCorrect, setindex1AnswerisCorrect] = useState(false);

  const contextObj = {
    index0answeriscorrect,
    setindex0AnswerisCorrect,
    index1AnswerisCorrect,
    setindex1AnswerisCorrect,
  };

  return data?.map((item, index) => (
    <GapFillContext.Provider index={index} value={contextObj}>
      <GapFill key={item._key} index={index} item={item}></GapFill>
    </GapFillContext.Provider>
  ));
}

export default GapFillWrapper;
