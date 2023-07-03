// import { useEffect } from "react";

// export const displayFormulas = () => {
//   useEffect(() => {
//     // mathJax added to index HTML head
//     //we need to tell MathJax to typeset the mathematics once it has been inserted into the page. We can use the MathJax.typeset() or MathJax.typesetPromise() functions for this.By calling the MathJax.typeset() function inside a useEffect, our latex can be rendered properly when a component re-render occurs.

//     if (typeof window?.MathJax !== "undefined") {
//       window.MathJax.typeset();
//     }
//   }, []);
// };
