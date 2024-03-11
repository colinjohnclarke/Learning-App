import { render, screen } from "@testing-library/react";
import MCQAnswerButtons from "./MCQAnswerButtons";
import { UserContext } from "../../App";
import { mockUserData } from "../../tesing/context/mockUserData";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { colors } from "../../styles/colors";

test("testing correct props are passed ", () => {
  const mockFunction = jest.fn();

  render(
    <UserContext.Provider value={mockUserData}>
      <MCQAnswerButtons
        isAlgebra={false}
        text={"test text"}
        isCorrect={false}
        updateStateFunctions={mockFunction}
      />
    </UserContext.Provider>
  );

  screen.debug();
  const answerButton = screen.getByTestId("answerButton");
  expect(answerButton).toBeInTheDocument();
  userEvent.click(answerButton);
 
  screen.debug();
});
