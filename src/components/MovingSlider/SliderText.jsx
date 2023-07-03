import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  index0correctanswerselected,
  index0correctanswerUNselected,
  index0EmptyArr,
  initialRenderCompleted,
} from "../../features/Slider/sliderindex0slice";

// function SliderText(props) {
//   const text = props.text;
//   const isCorrect = props.isCorrect;
//   let isSelected = props.isSelected;

//   const dispatch = useDispatch();

//   const [isSelected, setIsSelected] = useState(props.isSelected);
//   console.log(
//     "🚀 ~ file: SliderText.jsx:18 ~ SliderText ~ isSelected:",
//     text,
//     isSelected
//   );

//   const [isCorrect, setIsCorrect] = useState(props.isCorrect);

//   const isinitialRenderCompleted = useSelector(
//     (state) => state.sliderreducerindex0.renderCompleted
//   );

//   const correctanswerArr = useSelector(
//     (state) => state.sliderreducerindex0.value
//   );

//   // NOTE ALL propsp are passed to two text boxes
//   useEffect(() => {
//     if (isinitialRenderCompleted) {
//       if (isSelected && isCorrect) {
//         dispatch(index0correctanswerselected());
//         console.log("dispatch(index0correctanswerselected SECOND());");
//       } else if (!isSelected) {
//         dispatch(index0correctanswerUNselected());
//       }
//     }
//     return () => {
//       if (isinitialRenderCompleted) {
//         if (isSelected && isCorrect) {
//           dispatch(index0correctanswerUNselected());
//         } else if (!isSelected) {
//           dispatch(index0correctanswerselected());
//         }
//       }
//     };
//   }, [isSelected]);

//   useEffect(() => {
//     console.log(isSelected, isCorrect);
//     console.log({ text });
//     if (isSelected && isCorrect) {
//       dispatch(index0correctanswerselected());
//       console.log("dispatch(index0correctanswerselected( FIRST));");
//     }
//     dispatch(initialRenderCompleted());

//     return () => {
//       if (isSelected & isCorrect) {
//         dispatch(index0correctanswerUNselected());
//         console.log("return function fired is Selected and is Correct");
//       }

//       console.log("return function fired");
//     };
//   }, []);

//   return (
//     <div>
//       <p> STORE{JSON.stringify(correctanswerArr)}</p>
//       <p style={{ fontSize: "12px" }}>CORRECT: {JSON.stringify(isCorrect)}</p>

//       <p style={{ fontSize: "12px" }}>
//         ISSELECTED: {JSON.stringify(isSelected)}
//       </p>
//       <p style={{ fontSize: "12px" }}>{text}</p>
//     </div>
//   );
// }

// export default SliderText;
