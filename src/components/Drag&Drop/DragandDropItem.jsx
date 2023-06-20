import React, { useRef } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import {
  correctstyle,
  incorrectstyle,
  normalboxstyledragItem,
} from "../../styles/colors";

function DragandDropItem(props) {
  let statements = props.statements;

  const gettext = props.text;
  let iscorrect = props.iscorrect;
  let helpneeded = props.helpneeded;
  const allcorrect = props.allcorrect;

  const correct_answer_input_color = "rgba(137, 240, 158, 0.34)";
  const incorrect_answer_input_color = "rgba(240, 137, 137, 0.34)";
  const normal_input_color = "white";

  let itemstyle = { normalboxstyledragItem };

  if (iscorrect && helpneeded) {
    console.log(iscorrect);
    itemstyle = correctstyle;
  } else if (!iscorrect && helpneeded) {
    itemstyle = incorrectstyle;
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
  transition: 0.3s;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: rgba(0, 200, 200, 0.39) 0px 2px 4px inset,
    0 0 0 2px rgba(0, 200, 200, 0.39) inset, 0 8px 0 0 rgba(39, 106, 245, 0.3),
    0 8px 0 1px rgba(39, 106, 245, 0.3), 0 8px 8px 1px rgba(39, 106, 245, 0.3),
    rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset,
    rgba(0, 0, 0, 0.2) 0px 5px 10px;

  height: 80px;
  margin: 4%;
  max-width: 700px;
  border-radius: 20px;
  background-color: white;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 0.3);
  }

  &:active {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 0.5);
  }
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;

  border-radius: 20px;

  p {
    font-size: 14px;
  }
`;
