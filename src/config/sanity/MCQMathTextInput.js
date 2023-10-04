import React, { useEffect } from "react";
import styled from "styled-components";
import DOMPurify from "dompurify";

function MCQMathTextInput({ data, textstyle }) {
  //   console.log(
  //     "🚀 ~ file: MCQMathTextinput.js:9 ~ MCQMathTextInput ~ data CHECK:",
  //     data
  //   );
  useEffect(() => {
    // mathJax added to index HTML head
    //we need to tell MathJax to typeset the mathematics once it has been inserted into the page. We can use the MathJax.typeset() or MathJax.typesetPromise() functions for this.By calling the MathJax.typeset() function inside a useEffect, our latex can be rendered properly when a component re-render occurs.

    if (typeof window?.MathJax !== "undefined") {
      window.MathJax.typeset();
    }
  }, []);

  if (data._type === "latex") {
    // if alebgra then render xml maths
    const cleaned = DOMPurify.sanitize(data.body);
    return (
      <Wrapper>
        <Content dangerouslySetInnerHTML={{ __html: cleaned }}></Content>
      </Wrapper>
    );
  } else return null;
}

export default MCQMathTextInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
`;

const Content = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
`;
