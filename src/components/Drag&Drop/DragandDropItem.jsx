import React, { useRef } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";

function DragandDropItem(props) {
  let statements = props.statements;

  const gettext = props.text;
  let iscorrect = props.iscorrect;
  let helpneeded = props.helpneeded;
  const allcorrect = props.allcorrect;

  const correct_answer_input_color = "rgba(137, 240, 158, 0.34)";
  const incorrect_answer_input_color = "rgba(240, 137, 137, 0.34)";
  const normal_input_color = "white";

  let itemstyle = { backgroundColor: normal_input_color, transition: "0.7s" };

  if (iscorrect && helpneeded) {
    console.log(iscorrect);
    itemstyle = {
      backgroundColor: correct_answer_input_color,
      color: "green",
      boxShadow:
        "0 0 0 1px #6698cb inset, 0 0 0 2px rgba(255,255,255,0.15) inset, 0 8px 0 0 rgba(137, 240, 158, 0.34), 0 8px 0 1px rgba(0,0,0,.4),0 8px 8px 1px rgba(0,0,0,0.5)",
    };
  } else if (!iscorrect && helpneeded) {
    itemstyle = {
      backgroundColor: incorrect_answer_input_color,
      color: "red",
      boxShadow:
        "0 0 0 1px #6698cb inset, 0 0 0 2px rgba(255,255,255,0.15) inset, 0 8px 0 0 rgba(240, 137, 137, 0.34), 0 8px 0 1px rgba(220, 137, 137, 0.56),0 8px 8px 1px rgba(0,0,0,0.5)",
    };
  }

  if (allcorrect) {
    // console.log(allcorrect);
    itemstyle = { backgroundColor: correct_answer_input_color };
  }

  return (
    <Item style={itemstyle}>
      <Text>
        <p>{gettext}</p>
      </Text>
    </Item>
  );
}

export default DragandDropItem;

const Item = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: rgba(0, 200, 200, 0.39) 0px 2px 4px inset,
    0 0 0 2px rgba(0, 200, 200, 0.39) inset, 0 8px 0 0 rgba(39, 106, 245, 0.3),
    0 8px 0 1px rgba(39, 106, 245, 0.3), 0 8px 8px 1px rgba(39, 106, 245, 0.3);

  margin-bottom: 20px;
  height: 90px;
  width: 85vw;
  max-width: 700px;
  border-radius: 20px;
  background-color: white;

  &:hover {
    background-color: rgba(39, 106, 245, 0.05);
    // transform: translateY(-3px);
    transition: 0.1s;
  }

  &:active {
    background-color: rgba(39, 106, 245, 0.3);
  }
`;

const Text = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  border-radius: 20px;

  &:hover {
    background-color: rgba(39, 106, 245, 0.5);
    height: 100%;
    width: 100%;
    color: white;
    transition: 0.1s;
  }

  &:active {
    background-color: rgba(39, 106, 245, 0.5);
    height: 100%;
    width: 100%;
  }

  p {
    font-size: 15px;
  }
`;
