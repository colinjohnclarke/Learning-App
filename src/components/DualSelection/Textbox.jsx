import React, { useEffect, useContext } from "react";
import styled from "styled-components";

import { device } from "../../styles/breakpoints";
import MathsMLfromString from "../../config/sanity/MathsMLfromString";
import "animate.css";
import { UserContext } from "../../App";

import {
  darkThemePrimaryBackgroundColor,
  ThemeStyles,
} from "../../styles/ThemeStyles";

import {
  selectedbuttonstyle,
  correctstyle,
  incorrectstyle,
} from "../../styles/colors";

function Textbox({
  text,
  isCorrect,
  isSelected,

  isAlgebra,
  updateStateFunctions,
}) {
  const { correctAnswerIsSelected, setArrayOfBoolsFromCorrect } =
    updateStateFunctions;

  const { darkThemeActive } = useContext(UserContext);
  useEffect(() => {
    if (isSelected && isCorrect) {
      setArrayOfBoolsFromCorrect((val) => {
        const newState = [...val];
        newState.push(true);
        return newState;
      });
    } else if (!isSelected && isCorrect) {
      setArrayOfBoolsFromCorrect((val) => {
        const newState = [...val];
        newState.shift();
        return newState;
      });
    }
  }, [isSelected]);

  let style;

  if (isSelected) {
    style = selectedbuttonstyle;
  } else {
    style = {
      backgroundColor: darkThemeActive
        ? ThemeStyles.lightThemePrimaryBackgroundColor
        : darkThemePrimaryBackgroundColor,
    };
  }

  let content;

  if (correctAnswerIsSelected && isCorrect) {
    style = correctstyle;

    content = <></>;
  } else if (correctAnswerIsSelected && !isCorrect) {
    style = incorrectstyle;

    content = <></>;

    // <RxCross2 style={{ height: "10px", color: "white" }} />;
  } else if (!correctAnswerIsSelected) {
    content = <></>;
  }

  let styleindex1 = {
    color: "",
  };

  const whiteText = {
    color: "white",
  };

  const normalText = {
    color: "",
  };

  return (
    <Box
      darkThemeActive={darkThemeActive}
      disabled={correctAnswerIsSelected}
      className={
        correctAnswerIsSelected && isCorrect
          ? "animate__animated animate__bounce"
          : "animate__animated"
      }
      style={style}
    >
      {!isAlgebra ? (
        <Text
          style={correctAnswerIsSelected || isSelected ? whiteText : normalText}
        >
          {text}
        </Text>
      ) : (
        <MathsMLfromString data={text}></MathsMLfromString>
      )}

      {content}
    </Box>
  );
}

export default Textbox;

const Box = styled.button`
  transition: 0.3s;
  text-align: center;
  box-shadow: rgba(0, 200, 200, 0.39) 0px 2px 4px inset,
    0 0 0 2px rgba(0, 200, 200, 0.39) inset, 0 8px 0 0 rgba(39, 106, 245, 0.3),
    0 8px 0 1px rgba(39, 106, 245, 0.3), 0 8px 8px 1px rgba(39, 106, 245, 0.3),
    rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset,
    rgba(0, 0, 0, 0.2) 0px 5px 10px;

  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 700px;
  border-radius: 20px;
  background-color: white;
  border: none;

  &:hover {
    background-color: rgba(0, 245, 245, 1);
  }
`;

const Text = styled.p`
  font-size: 14px;

  @media ${device.mobileL} {
    p {
      font-size: 16px;
    }
  }
`;

//   @media ${(device.mobileS, device.mobileM, device.mobileL)} {
//     width: 100%;
//     p {
//       font-size: 16px;
//     }

//   }

//   @media ${device.laptop} {
//     width: 70%;
//     p {
//       font-size: 17px;
//     }
// `;
