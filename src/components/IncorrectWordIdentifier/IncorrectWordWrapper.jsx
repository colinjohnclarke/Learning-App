import React from "react";
import { styled } from "styled-components";
import IncorrectWordText from "./IncorrectWordText";

function IncorrectWordWrapper(props) {
  const incorrect_words_from_text = props.data;

  return (
    <Main>
      {incorrect_words_from_text?.map((item, index) => {
        return (
          <IncorrectWordText
            key={item._key}
            data={item}
            index={index}
          ></IncorrectWordText>
        );
      })}
    </Main>
  );
}

export default IncorrectWordWrapper;

const Main = styled.div``;
