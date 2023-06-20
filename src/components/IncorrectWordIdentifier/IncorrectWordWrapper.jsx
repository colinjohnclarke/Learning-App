import React from "react";
import { styled } from "styled-components";
import IncorrectWordText from "./IncorrectWordText";

function IncorrectWordWrapper(props) {
  const incorrect_words_from_text = props.data;
  console.log(
    "🚀 ~ file: IncorrectWordWrapper.jsx:7 ~ IncorrectWordWrapper ~ incorrect_words_from_text CHECL:",
    incorrect_words_from_text
  );
  return (
    <Main>
      {incorrect_words_from_text?.map((item, index) => {
        return (
          <IncorrectWordText data={item} index={index}></IncorrectWordText>
        );
      })}
    </Main>
  );
}

export default IncorrectWordWrapper;

const Main = styled.div``;
