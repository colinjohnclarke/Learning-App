import React, { useState } from "react";
import DragDropRandomise from "./DragDropRandomise";

function DragandDropWrapper({ data }) {
  const [correctAnswerIsSelected, setCorrectAnswerSelected] = useState(false);
  const [rerunRandomiseRequired, setrerunRandomiseRequired] = useState(false);

  const updateStateFunctions = {
    rerunRandomiseRequired,
    setrerunRandomiseRequired,
    correctAnswerIsSelected,
    setCorrectAnswerSelected,
  };

  return data?.map((item, index) => (
    <DragDropRandomise
      updateStateFunctions={updateStateFunctions}
      key={item._key}
      data={item}
    ></DragDropRandomise>
  ));
}

export default React.memo(DragandDropWrapper);
