import React, { useEffect } from "react";
import styled from "styled-components";

import DOMPurify from "dompurify";
function MathsMLfromString({ data, style }) {
  useEffect(() => {
    // mathJax added to index HTML head
    //we need to tell MathJax to typeset the mathematics once it has been inserted into the page. We can use the MathJax.typeset() or MathJax.typesetPromise() functions for this.By calling the MathJax.typeset() function inside a useEffect, our latex can be rendered properly when a component re-render occurs.

    if (typeof window?.MathJax !== "undefined") {
      window.MathJax.typeset();
    }
  }, []);

  // if alebgra then render xml maths
  const cleaned = DOMPurify.sanitize(data);
  const content = (
    <h2
      style={{
        fontSize: "1.5rem",
        textAlign: "center",
      }}
      dangerouslySetInnerHTML={{ __html: cleaned }}
    ></h2>
  );

  return [content];
}

export default MathsMLfromString;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //   text-align: left;
`;
