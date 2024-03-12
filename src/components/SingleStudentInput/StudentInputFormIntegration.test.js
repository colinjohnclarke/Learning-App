import React, { useState, useContext } from "react";
import { render, screen } from "@testing-library/react";
import InputForm from "./InputForm";
import Score from "../Data/CurrentQuestionScores/Score";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import Hint from "./Hint";
import { UserContext } from "../../App";
import { mockUserData } from "../../tesing/context/mockUserData";
import "@testing-library/jest-dom/extend-expect";
import { userEvent } from "@testing-library/user-event";

// import Score from "../Score";
// import Question from "../Question";
// import PortableText from "../PortableText";
// import Hint from "../Hint";
// import InputForm from "../InputForm";

describe("Intgration test", () => {
  const correctAnswerIsSelected = true;
  const totalMarksAvailable = 10;
  const index = 0;
  const question = "What is your favorite color?";
  const image = "Some image value";
  const myPortableTextComponents = {}; // Define your PortableText components here
  const hint = "Some hint text";
  const helpneeded = true;
  const helpBtnClickHandler = jest.fn();
  const spanStyle = {};
  const selectedInputColor = "red";
  const animate = "";
  const handleSubmit = jest.fn();
  const handleFocusInput = jest.fn();
  const textfieldLabel = "Some textfield label";
  const handleFormChange = jest.fn();

  test("renders all children correctly", async () => {
    render(
      <UserContext.Provider value={mockUserData}>
        <Question>{question}</Question>
        <PortableText value={image} components={myPortableTextComponents} />
        {hint && (
          <Hint
            helpneeded={helpneeded}
            helpBtnClickHandler={helpBtnClickHandler}
            hint={hint}
          />
        )}
        <InputForm
          spanStyle={spanStyle}
          selectedInputColor={selectedInputColor}
          animate={animate}
          handleSubmit={handleSubmit}
          handleFocusInput={handleFocusInput}
          textfieldLabel={textfieldLabel}
          handleFormChange={handleFormChange}
        />
      </UserContext.Provider>
    );

    expect(screen.getByText(question)).toBeInTheDocument();
    expect(screen.getByText(textfieldLabel)).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    const user = userEvent.setup();

    await user.click(input);
    expect(handleFocusInput).toHaveBeenCalled();

    await user.type(input, "colin");
    expect(handleFormChange).toHaveBeenCalled();
  });
});

const Question = styled.p`
  padding-top: 40px;
  padding: 30px;
  text-align: center;
  font-weight: 400;
`;
