// import { render, screen } from "@testing-library/react";
// import IncorrectWordText from "./IncorrectWordText";
// import { UserContext } from "../../App";
// import { mockUserData } from "../../tesing/context/mockUserData";
// import { mockIncorrectWordData } from "./mockIncorrectWordData";
// import { useState } from "react";

// // const [correctAnswerIsSelected, setCorrectAnswerIsSelected] = useState(false);

// // const [mcq1State, setMcq1State] = useState({
// //   correctAnswerSeleted: null,
// //   incorrectAnswerSelected: null,
// // });
// // const [mcq2State, setMcq2State] = useState({
// //   correctAnswerSeleted: null,
// //   incorrectAnswerSelected: null,
// // });
// // const [pointsScored, setPointsScored] = useState(0);

// // const updateStateFunctions = {
// //   correctAnswerIsSelected,
// //   setCorrectAnswerIsSelected,
// //   pointsScored,
// //   setPointsScored,
// //   mcq1State,
// //   setMcq1State,
// //   mcq2State,
// //   setMcq2State,
// // };

// test("if correct word is selected mcq1 is displayed", () => {
//   const mockFunction = jest.fn();

//   render(
//     <UserContext.Provider value={mockUserData}>
//       <IncorrectWordText
//         updateStateFunctions={mockFunction}
//         data={mockIncorrectWordData}
//         index={1}
//       />
//     </UserContext.Provider>
//   );
// });
