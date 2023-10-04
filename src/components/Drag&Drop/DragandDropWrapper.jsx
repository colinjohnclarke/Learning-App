import React, { useState } from "react";
import DragDropRandomise from "./DragDropRandomise";
import { DragandDropContext } from "./DragandDropContext";

function DragandDropWrapper({ data }) {
  console.log(
    "🚀 ~ file: DragandDropWrapper.jsx:6 ~ DragandDropWrapper ~ data:",
    data
  );
  const [index0AnswerisCorrect, setindex0AnswerisCorrect] = useState(false);
  const [index1AnswerisCorrect, setindex1AnswerisCorrect] = useState(false);
  const [rerunRandomiseRequired, setrerunRandomiseRequired] = useState(false);

  const contextObj = {
    index0AnswerisCorrect,
    setindex0AnswerisCorrect,
    index1AnswerisCorrect,
    setindex1AnswerisCorrect,
    rerunRandomiseRequired,
    setrerunRandomiseRequired,
  };

  return data?.map((item, index) => (
    <DragandDropContext.Provider index={index} value={contextObj}>
      <DragDropRandomise
        index={index}
        key={item._key}
        data={item}
      ></DragDropRandomise>
    </DragandDropContext.Provider>
  ));
}

export default DragandDropWrapper;
