import { screen, render } from "@testing-library/react";
import Hint from "./Hint";
import InputForm from "./InputForm";
import { UserContext } from "../../App";
import { mockUserData } from "../../tesing/context/mockUserData";
import "@testing-library/jest-dom/extend-expect";

import { userEvent } from "@testing-library/user-event";

test("handler is dispatched when clicked and hint has style display none if help needed is false", async () => {
  const hint = "test";
  const helpBtnClickHandler = jest.fn();
  const helpneeded = false;

  render(
    <UserContext.Provider value={mockUserData}>
      <Hint
        hint={hint}
        helpBtnClickHandler={helpBtnClickHandler}
        helpneeded={helpneeded}
      ></Hint>
    </UserContext.Provider>
  );
  const user = userEvent.setup();

  expect(screen.getByRole("button")).toBeInTheDocument();
  await user.click(screen.getByRole("button"));
  expect(helpBtnClickHandler).toHaveBeenCalled();
  screen.debug();
  const hintContent = screen.getByTestId("helpContent");
  expect(hintContent).toBeInTheDocument();
  expect(hintContent).toHaveStyle("display: none");
});

test("hint has style display flex if help needed is true", async () => {
  const hint = "test";
  const helpBtnClickHandler = jest.fn();
  const helpneeded = true;

  render(
    <UserContext.Provider value={mockUserData}>
      <Hint
        hint={hint}
        helpBtnClickHandler={helpBtnClickHandler}
        helpneeded={helpneeded}
      ></Hint>
    </UserContext.Provider>
  );

  const hintContent = screen.getByTestId("helpContent");
  expect(hintContent).toBeInTheDocument();
  expect(hintContent).toHaveStyle("display: flex");
});
