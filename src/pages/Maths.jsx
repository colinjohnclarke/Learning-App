import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sanityClient from "../createclient";
import DOMPurify from "dompurify";

function Maths() {
  const [data, setData] = useState({});

  let content_from_api = "algebra";
  let content_name = "formula";

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "algebra"]`)
      .then((result) => setData(result[0]))
      .catch(console.error);
  }, []);

  useEffect(() => {
    // mathJax added to index HTML head
    //we need to tell MathJax to typeset the mathematics once it has been inserted into the page. We can use the MathJax.typeset() or MathJax.typesetPromise() functions for this.By calling the MathJax.typeset() function inside a useEffect, our latex can be rendered properly when a component re-render occurs.

    if (typeof window?.MathJax !== "undefined") {
      window.MathJax.typeset();
    }
  }, []);

  //   const math2 = (
  //     <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  //       <mi mathvariant="normal">&#x394;</mi>
  //       <msub>
  //         <mi>E</mi>
  //         <mrow>
  //           <mi>t</mi>
  //         </mrow>
  //       </msub>
  //       <mo>=</mo>
  //       <mi style={{ color: "red", fontSize: "30px", fontWeight: "bold" }}>?</mi>
  //       <mo>&#xD7;</mo>
  //       <mi>c</mi>
  //       <mo>&#xD7;</mo>
  //       <mi mathvariant="normal">&#x394;</mi>
  //       <mi mathvariant="normal">&#x398;</mi>
  //     </math>
  //   );

  var clean = DOMPurify.sanitize(data.formula_math_xl);

  const formula_maths_jax = data.formula_maths_jax;

  return (
    <Wrapper style={{ height: "700px", width: "500px", fontSize: "30px" }}>
      <p dangerouslySetInnerHTML={{ __html: clean }}></p>

      {/* <p dangerouslySetInnerHTML={{ __html: formula_maths_jax }}></p> */}
    </Wrapper>
  );
}

export default Maths;

const Wrapper = styled.div``;
