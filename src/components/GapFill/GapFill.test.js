import { render, screen } from "@testing-library/react";
import { userEvent, UserEvent } from "@testing-library/user-event";
import { correctstyle } from "../../styles/colors";
import styled from "styled-components";
import "@testing-library/jest-dom/extend-expect";

test("input works updates correctly", async () => {
  const initial_scentence = "initial scentence";
  const remainder = "initial scentence";
  const isCorrect = false;
  const setInputFieldGapFill = jest.fn();

  render(
    <Text>
      {initial_scentence}
      <Input
        style={{
          backgroundColor: isCorrect ? correctstyle.backgroundColor : "",
        }}
        className={
          isCorrect ? "animate__animated animate__bounce animate__faster" : ""
        }
        type="text"
        onChange={(e) => {
          setInputFieldGapFill();
        }}
      />
      {remainder}
    </Text>
  );
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
  userEvent.click(input);
  await userEvent.type(input, "test");
  expect(setInputFieldGapFill).toHaveBeenCalled();
  expect(input).not.toHaveStyle(
    `background-color: ${correctstyle.backgroundColor};`
  );
});

test("input works updates correctly", async () => {
  const initial_scentence = "initial scentence";
  const remainder = "initial scentence";
  const isCorrect = true;
  const setInputFieldGapFill = jest.fn();

  render(
    <Text>
      {initial_scentence}
      <Input
        style={{
          backgroundColor: isCorrect ? correctstyle.backgroundColor : "",
        }}
        className={
          isCorrect ? "animate__animated animate__bounce animate__faster" : ""
        }
        type="text"
        onChange={(e) => {
          setInputFieldGapFill();
        }}
      />
      {remainder}
    </Text>
  );
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
  userEvent.click(input);
  await userEvent.type(input, "test");
  expect(setInputFieldGapFill).toHaveBeenCalled();
  expect(input).toHaveStyle(
    `background-color: ${correctstyle.backgroundColor};`
  );
});

const Input = styled.input``;

const Text = styled.p``;
