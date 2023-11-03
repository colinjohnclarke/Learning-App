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
    // <div style={{ position: "relative", width: "100%" }}>
    <GapFillContext.Provider index={index} value={contextObj}>
      <GapFill key={item._key} index={index} item={item}></GapFill>
    </GapFillContext.Provider>
    // </div>
  ));
}

export default GapFillWrapper;
