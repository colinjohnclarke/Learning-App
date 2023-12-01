import React, { useEffect, useState } from "react";
import MCQAnswerButtons from "./MCQAnswerButtons";
import ImagefromSanity from "../../config/sanity/ImagefromSanity";
import styled from "styled-components";

// function MCQblock(props) {
//   const data = props.item;
//   const index = props.index;
//   const updateStateFunctions = props.updateStateFunctions;

//   let objkey0 = {};
//   let objkey1 = {};
//   let objkey2 = {};
//   let objkey3 = {};

//   let sorted;

//   useEffect(() => {
//     const nu1 = Math.random();
//     const nu2 = Math.random();
//     const nu3 = Math.random();
//     const nu4 = Math.random();

//     const random = [
//       { number: nu1, value: data.distractor_1, isCorrect: false },
//       { number: nu2, value: data.distractor_2, isCorrect: false },
//       { number: nu3, value: data.distractor_3, isCorrect: false },
//       { number: nu4, value: data.correct_answer, isCorrect: true },
//     ];

//     let sorted = random.sort((number1, number2) =>
//       number1.number < number2.number
//         ? 1
//         : number1.number > number2.number
//         ? -1
//         : 0
//     );
//     // objkey0 = sorted[0];
//     // objkey1 = sorted[1];
//     // objkey2 = sorted[2];
//     // objkey3 = sorted[3];
//   }, [data]);

//   objkey0 = sorted[0];
//   objkey1 = sorted[1];
//   objkey2 = sorted[2];
//   objkey3 = sorted[3];

//   return (
//     <div>
//       <ImagefromSanity data={data.picture}></ImagefromSanity>
//       <MCQAnswerButtons
//         isAlgebra={data.isAlgebra}
//         updateStateFunctions={updateStateFunctions}
//         index={index}
//         isCorrect={objkey0.isCorrect}
//         text={objkey0.value}
//       ></MCQAnswerButtons>
//       <MCQAnswerButtons
//         isAlgebra={data.isAlgebra}
//         updateStateFunctions={updateStateFunctions}
//         index={index}
//         isCorrect={objkey1.isCorrect}
//         text={objkey1.value}
//       ></MCQAnswerButtons>
//       <MCQAnswerButtons
//         isAlgebra={data.isAlgebra}
//         updateStateFunctions={updateStateFunctions}
//         index={index}
//         isCorrect={objkey2.isCorrect}
//         text={objkey2.value}
//       ></MCQAnswerButtons>
//       <MCQAnswerButtons
//         isAlgebra={data.isAlgebra}
//         updateStateFunctions={updateStateFunctions}
//         index={index}
//         isCorrect={objkey3.isCorrect}
//         text={objkey3.value}
//       ></MCQAnswerButtons>
//     </div>
//   );
// }

// export default MCQblock;

function MCQblock({ item, index, updateStateFunctions }) {
  const {
    distractor_1,
    distractor_2,
    distractor_3,
    correct_answer,
    picture,
    isAlgebra,
  } = item;

  // Shuffle the answer options randomly
  let options = [distractor_1, distractor_2, distractor_3, correct_answer]
    .map((value) => ({
      value,
      isCorrect: value === correct_answer,
      number: Math.random(),
    }))
    .sort((a, b) => b.number - a.number);

  const [shuffledOptions, setShuffledOptions] = useState(options);

  return (
    <Wrapper>
      <ImagefromSanity data={picture}></ImagefromSanity>
      {shuffledOptions.map((option, optionIndex) => (
        <MCQAnswerButtons
          key={optionIndex}
          isAlgebra={isAlgebra}
          updateStateFunctions={updateStateFunctions}
          index={index}
          isCorrect={option.isCorrect}
          text={option.value}
        />
      ))}
    </Wrapper>
  );
}

export default React.memo(MCQblock);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
