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

  let fontSize = "16px";

  if (gettext.length > 130 && window.innerWidth < 400) {
    fontSize = "14px";
    console.log("smallscreen");
  } else if (gettext.length > 120) {
    fontSize = "15px";
  }

  const Text = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    border-radius: 20px;

    p {
      font-size: ${fontSize};
      padding-left: 8px;
      padding-right: 8px;
    }
  `;

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
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 200, 200, 1) 0px 2px 5px -1px;
  rgba(0, 200, 200, 1) 0px 1px 3px -1px;
  min-height: 80px;
  height: 80px;
  min-width: 310px;
  width: 97%;
  max-width: 700px;
  border-radius: 20px;
  background-color: white;
  position: relative;
  cursor: grab;
  

  &:hover {
    transform: translateY(-2px);
    

  }

  &:active {
   border: 2px solid rgba(0, 200, 200, 1); 
   box-shadow: rgba(0, 200, 200, 1) 0px 2px 5px -1px;
   rgba(0, 200, 200, 1) 0px 1px 3px -1px;
   box-shadow: rgba(0, 200, 200, 0.35) 0px 5px 15px;
   box-shadow: rgba(0, 00, 00, 0.35) 0px 5px 15px;
  
  }
`;
