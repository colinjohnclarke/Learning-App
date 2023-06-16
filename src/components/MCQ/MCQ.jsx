import React from "react";
import styled from "styled-components";
import MCQblock from "./MCQblock";
import MCQTeacherResponse from "./MCQTeacherResponse";

function MCQ({ data }) {
  return (
    <ExampleQuiz>
      <h2>Example quiz</h2>
      {data?.map((item, index) => {
        return (
          <div key={item._key}>
            <p>{item.question}</p>
            <MCQblock item={item} index={index} />
            <MCQTeacherResponse item={item} />
          </div>
        );
      })}
    </ExampleQuiz>
  );
}

export default MCQ;

const ExampleQuiz = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // margin: 5px;
`;
