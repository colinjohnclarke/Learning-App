import React, { useState } from "react";
import DragDropRandomise from "./DragDropRandomise";
import { DragandDropContext } from "./DragandDropContext";

function DragandDropWrapper(props) {
  const data = props.order_items_drag_drop;

  const [index0AnswerisCorrect, setindex0AnswerisCorrect] = useState(false);

  const [index1AnswerisCorrect, setindex1AnswerisCorrect] = useState(false);

  const contextObj = {
    index0AnswerisCorrect,
    setindex0AnswerisCorrect,
    index1AnswerisCorrect,
    setindex1AnswerisCorrect,
  };

  return data?.map((item, index) => (
    <DragandDropContext.Provider index={index} value={contextObj}>
      <DragDropRandomise
        index={index}
        key={item._key}
        order_items_drag_drop={item}
      ></DragDropRandomise>
    </DragandDropContext.Provider>
  ));
}

export default DragandDropWrapper;
