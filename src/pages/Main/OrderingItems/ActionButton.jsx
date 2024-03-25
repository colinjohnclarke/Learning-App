import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { ActionButtonContext } from "../../Main/OrderingItems/ActionButtonContext";
import { UserContext } from "../../../App";
import { correctstyle } from "../../../styles/colors";
import "animate.css";

function ActionButton({
  displayedComponentCount,
  handleActionBtnClick,
  arrayOfAflComponents,
}) {
  const [buttonContent, setButtonContent] = useState("Continue");
  const { buttonState, setButtonState } = useContext(ActionButtonContext);
  const { userData } = useContext(UserContext);
  console.log("🚀 ~ userData:", userData);

  const buttonContentArr = arrayOfAflComponents.map(
    (component) => component.type.type.name
  );

  const positiveFeedbackButton = [
    `Amazing work ${userData.user.firstName} !`,
    `Great Work ${userData.user.firstName}!`,
    "Awesome!",
    `Great, too easy ${userData.user.firstName}!?`,
    "Smarty Pants!",
    "Ooh Good job!",
    "Niceeee, keep going!",
    `Smashed it ${userData.user.firstName}!`,
    `This is too easy ${userData.user.firstName}?!`,
    "Lovely work",
    `Impressive, ${userData.user.firstName}!`,
    `Well done, ${userData.user.firstName}!`,
    `You're on fire, ${userData.user.firstName}!`,
    `Superb job!`,
    `Brilliant work, ${userData.user.firstName}!`,
    `You're nailing it, ${userData.user.firstName}!`,
    `Excellent job!`,
    `Outstanding work!`,
    `You've got this, ${userData.user.firstName}!`,
    `Fantastic job, ${userData.user.firstName}!`,
  ];

  useEffect(() => {
    if (buttonState.value === "true") {
      setButtonContent(
        (prev) =>
          positiveFeedbackButton[
            Math.floor(Math.random() * positiveFeedbackButton.length)
          ]
      );

      setTimeout(() => {
        setButtonContent((prev) => "Continue");
        setButtonState((prev) => ({
          ...prev,
          value: "undefined",
        }));
      }, 2000);
    }
  }, [buttonState]);

  console.log("🚀 ~ buttonContentArr:", buttonContentArr);

  useEffect(() => {
    console.log("buttonState", buttonState);
    console.log("userData.user.firstName", userData.user.firstName);
    buttonContentArr.forEach((comp, index) => {
      if (index === displayedComponentCount - 2) {
        switch (comp) {
          case "FillMissingValuesTable":
            setButtonContent("Look at the table above");
            break;
          case "DualSelectionWrapper":
            setButtonContent("Click the incorrect box");
            break;
          case "MovingSliderWrapper":
            setButtonContent("Switch the sliders");
            break;
          case "IncorrectWordWrapper":
            setButtonContent("Click Incorrect word");
            break;
          case "GapFillWrapper":
            setButtonContent("Fill the gaps");
            break;
          case "StudentTextInputWrapper":
            setButtonContent("Write your answer");
            break;
          case "MCQ":
            setButtonContent("Select the correct option");
            break;
          case "DragandDropWrapper":
            setButtonContent("Drag statements");
            break;

          default:
            break;
        }
      }
    });
  }, [displayedComponentCount]);

  return (
    <Wrapper
      className={
        buttonState.value === "true"
          ? " animate__animated animate__flipInX"
          : " animate__animated animate__flipInY"
      }
      style={buttonState.value === "true" ? correctstyle : {}}
      onClick={handleActionBtnClick}
    >
      <p style={{ color: "white", fontWeight: "500" }}>{buttonContent}</p>
    </Wrapper>
  );
}

export default ActionButton;

const Wrapper = styled.button`
  height: 50px;
  width: 310px;
  // left: 10px;
  // position: fixed;
  // bottom: 20px;
  // z-index: 100;
  border-radius: 16px;
  border: none;
  background-color: rgb(0, 245, 245);
  color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  &:hover {
    transform: translateY(4px);
  }

  &:active {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
  }
`;
