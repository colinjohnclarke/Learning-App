import React, { Children, useEffect, useState } from "react";

import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  correctstyle,
  incorrectstyle,
  normalboxstyledragItem,
} from "../../styles/colors";

function DragandDropItem(props) {
  const [fontsize, setFontSize] = useState("16px");

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });

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
  let textStyle = {};

  let textColor = {};

  if (allcorrect) {
    itemstyle = correctstyle;
    textColor = "white";
  }

  const handleResize = () => {
    if (gettext.length > 130 && window.innerWidth < 400) {
      setFontSize((val) => "13px");
    } else if (gettext.length > 110 && window.innerWidth < 450) {
      setFontSize((val) => "15px");
    } else setFontSize((val) => "16px");
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (gettext.length > 130 && window.innerWidth < 400) {
      setFontSize((val) => "13px");
    } else if (gettext.length > 110 && window.innerWidth < 400) {
      setFontSize((val) => "15px");
    } else setFontSize((val) => "16px");
  }, []);

  const { attributes, listeners, setNodeRef, transform, transition, disabled } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "90%",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      disabled={disabled}
    >
      <Item>
        <Text style={itemstyle}>
          {/* {props.id} */}
          <p
            style={{
              fontSize: fontsize,
              color: allcorrect ? textColor : "",
            }}
          >
            {gettext}
          </p>
        </Text>
      </Item>
    </div>
  );
}

export default DragandDropItem;

const Item = styled.div`
transition: 0.3s; 
  margin: 5px;
  box-shadow: rgba(0, 200, 200, 1) 0px 2px 5px -1px;
  rgba(0, 200, 200, 1) 0px 1px 3px -1px;
height: 80px;
 
  // min-width: 280px;
  width: 100%; 

  max-width: 700px;
  border-radius: 20px;
  background-color: white;
  position: relative;
  cursor: grab;
  // left: 20px; 


// @media ${device.iphone12} {
//   width: 90%; 
// }


  @media ${device.mobileM} {
    left: 20px; 
    width: 95%; 
  }


  @media ${device.mobileL} {
    left: 25px; 
    width: 90%; 
  }

  &:active {
   
   box-shadow: rgba(0, 200, 200, 1) 0px 2px 5px -1px;
   rgba(0, 200, 200, 1) 0px 1px 3px -1px;
   box-shadow: rgba(0, 200, 200, 0.35) 0px 5px 15px;
   box-shadow: rgba(0, 00, 00, 0.35) 0px 5px 15px;
transition: 0.3s; 

  }
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-radius: 20px;

  p {
    // font-size: ${(props) => props.fontSize};
    padding-left: 8px;
    padding-right: 8px;
  }
`;
