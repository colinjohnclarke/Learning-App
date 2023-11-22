import React, { useState } from "react";
import StudentInputForm from "./StudentInputForm";
import { TextInputContext } from "./TextInputContext";

function StudentTextInputWrapper(props) {
  const data = props.data;

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

  return (
    data &&
    Array.isArray(data) &&
    data?.map((item, index) => {
      return (
        <TextInputContext.Provider value={contextObj}>
          <StudentInputForm
            key={item._key}
            data={item}
            index={index}
          ></StudentInputForm>
        </TextInputContext.Provider>
      );
    })
  );
}

export default React.memo(StudentTextInputWrapper);
