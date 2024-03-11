import { screen, render } from "@testing-library/react";
import MCQAnswerButtons from "./MCQAnswerButtons";
import MCQblock from "./MCQblock";
import { mockMCQBlockData } from "./MockMCQBlockData";
import { UserContext } from "../../App";
import { mockUserData } from "../../tesing/context/mockUserData";
import "@testing-library/jest-dom/extend-expect";
import { userDataSlice } from "../../features/api/UserData/userDataSlice";
import { userEvent } from "@testing-library/user-event";
import { colors } from "../../styles/colors";

test("MCQ 4 Answer Buttons are rendered", () => {
  const mockFunction = jest.fn();

  const answers = [
    "Glucose Concentration",
    "Nitrogen Concentration",
    "Light Intensity",
    "Oxygen Concentration",
  ];

  render(
    <UserContext.Provider value={mockUserData}>
      <MCQblock
        data-testid="answerBlock"
        updateStateFunctions={mockFunction}
        index={1}
        item={mockMCQBlockData}
      />
    </UserContext.Provider>
  );
  screen.debug();

  //   const buttons = screen.getAllByRole("button");

  //   //   expect(buttons).toHaveAttribute("isAlgebra");

  //   expect(buttons).toHaveLength(4);

  //   buttons.forEach((button) => {
  //     expect(button).toHaveAttribute("type", "button");
  //     // expect(button).toHaveAttribute("type", "isAlgebra");
  //   });

  //   answers.forEach((answer, index) => {
  //     const answerButton = screen.getByText(answer);
  //     expect(answerButton).toBeInTheDocument();
  //   });

  const btns = screen.getAllByTestId("answerBtn");

  btns.forEach((btn) => {
    expect(btn).toHaveAttribute("isCorrect");
  });
});
