import React from "react";
import styled from "styled-components";
import MCQblock from "./MCQblock";
import MCQTeacherResponse from "./MCQTeacherResponse";
import Score from "../scores/Score";

function MCQ({ data }) {
  return (
    <Wrapper>
      <Score></Score>

      {data?.map((item, index) => {
        return (
          <div key={item._key}>
            <p>{item.question}</p>
            <MCQblock item={item} index={index} />
            <MCQTeacherResponse item={item} />
          </div>
        );
      })}
    </Wrapper>
  );
}

export default MCQ;

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;
