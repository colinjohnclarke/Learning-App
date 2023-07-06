import React from "react";
import StudentInputForm from "./StudentInputForm";

function StudentTextInputWrapper(props) {
  const data = props.data;

  return data?.map((item, index) => {
    return (
      <StudentInputForm
        key={item._key}
        data={item}
        index={index}
      ></StudentInputForm>
    );
  });
}

export default StudentTextInputWrapper;
