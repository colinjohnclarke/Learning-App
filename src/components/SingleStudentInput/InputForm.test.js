import { screen, render } from "@testing-library/react";
import InputForm from "./InputForm";
import { mockStudentInputData } from "./mockStudentInputData";
import { UserContext } from "../../App";
import { mockUserData } from "../../tesing/context/mockUserData";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

test("test", async () => {
  const handleFormChange = jest.fn();
  const textfieldLabel = "test";
  const handleFocusInput = jest.fn();
  const handleSubmit = jest.fn();
  const animate = "test";
  const selectedInputColor = {};
  const spanStyle = {};
  render(
    <UserContext.Provider value={mockUserData}>
      <InputForm
        handleFormChange={handleFormChange}
        textfieldLabel={textfieldLabel}
        handleFocusInput={handleFocusInput}
        handleSubmit={handleSubmit}
        animate={animate}
        selectedInputColor={selectedInputColor}
        spanStyle={spanStyle}
      ></InputForm>
    </UserContext.Provider>
  );

  const form = screen.getByTestId("form");
  expect(form).toBeInTheDocument();
  const focus = screen.getByTestId("focus");
  const user = userEvent.setup();
  await user.click(focus);
  expect(handleFocusInput).toHaveBeenCalled();
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
  await user.type(input, "colin");
  expect(handleFormChange).toHaveBeenCalled();
});
