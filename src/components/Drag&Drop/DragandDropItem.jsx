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

  let itemstyle = { normalboxstyledragItem };

  if (iscorrect && helpneeded) {
    itemstyle = correctstyle;
  } else if (!iscorrect && helpneeded) {
    itemstyle = incorrectstyle;
  }

  if (allcorrect) {
    // console.log(allcorrect);
    itemstyle = correctstyle;
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
  box-shadow: rgba(0, 200, 200, 0.5) 0px 2px 5px -1px,
    rgba(0, 200, 200, 0.5) 0px 1px 3px -1px;

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
    font-size: 15px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;
