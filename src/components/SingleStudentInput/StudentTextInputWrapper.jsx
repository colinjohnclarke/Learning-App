import React, { useState } from "react";
import StudentInputForm from "./StudentInputForm";

function StudentTextInputWrapper({ data }) {
  const [correctAnswerIsSelected, setCorrectAnswerIsSelected] = useState(false);
  const [incorrectAnswerIsSelected, setIncorrectAnswerIsSelected] =
    useState(false);

  const updateStateFunctions = {
    correctAnswerIsSelected,
    setCorrectAnswerIsSelected,
    incorrectAnswerIsSelected,
    setIncorrectAnswerIsSelected,
  };

  return (
    data &&
    Array.isArray(data) &&
    data?.map((item, index) => {
      return (
        <StudentInputForm
          updateStateFunctions={updateStateFunctions}
          key={item._key}
          data={item}
          index={index}
        ></StudentInputForm>
      );
    })
  );
}

export default React.memo(StudentTextInputWrapper);
