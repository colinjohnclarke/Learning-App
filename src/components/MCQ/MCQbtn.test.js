import MCQbtn from "./MCQbtn";
import { mockUserData } from "../../tesing/context/mockUserData";
import { UserContext } from "../../App";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const darkThemeActive = true;
const buttonDisabled = true;
const buttonstyle = {};
const onPressed = () => {};
const animateclass = "test";

test("has  correct props?", () => {
  render(
    <UserContext.Provider value={mockUserData}>
      <MCQbtn
        disabled={buttonDisabled}
        className={animateclass}
        style={buttonstyle}
        onClick={onPressed}
        isCorrect={false}
      ></MCQbtn>
    </UserContext.Provider>
  );

  screen.debug();

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute("disabled");
  expect(button.disabled).toBe(true);


});
