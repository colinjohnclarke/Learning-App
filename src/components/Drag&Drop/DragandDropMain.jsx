import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../features/draganddropdataSlice";
import { combineReducers } from "@reduxjs/toolkit";
import "animate.css";
import DragandDropItem from "./DragandDropItem";
import { device } from "../../styles/breakpoints";
import HelpBtn from "../Buttons/HelpBtn";
import Score from "../scores/Score";

function DragandDropMain(props) {
  const [introduction, setIntroduction] = useState([]);
  const [statements, setStatements] = useState([]);
  const [destinationindex, setDestinationIndex] = useState();
  const [itemdragged, setItemDragged] = useState();
  const [helpneeded, setHelpNeeded] = useState(false);

  // const animateclass = "animate__animated animate__tada ";

  const data = props.randomisedorderitemsarr;

  useEffect(() => {
    const getintro = data.filter((item) => item.id === "10");
    setIntroduction(getintro);

    const getstatements = data.filter((item) => item.id < "10");
    setStatements(getstatements);
  }, [data]);

  const handleOnDragEnd = (result) => {
    console.log(result);
    setDestinationIndex(result.destination.index);
    setItemDragged(result.draggableId);

    if (!result.destination) return;
    // make a intermediate copy of state to update
    const newlist = statements;
    // remove the dragged item from list at source
    const [reorderedItem] = newlist.splice(result.source.index, 1);
    // append the new item to arr
    newlist.splice(result.destination.index, 0, reorderedItem);
    // set updated state to be re-mapped

    const checkindividualstatments = newlist.map((item, index) => {
      if (item.id == index) {
        return { id: item.id, iscorrect: true, value: item.value };
      } else {
        return { id: item.id, iscorrect: false, value: item.value };
      }
    });

    setStatements(checkindividualstatments);
  };

  let correctnumstatments = 0;

  let incorrectnumstatments = 0;

  let checkstatments = statements.forEach((item, index) => {
    if (item.id == index) {
      correctnumstatments += 1;
    } else {
      incorrectnumstatments -= 1;
    }
  });

  let allcorrect = false;

  if (correctnumstatments == statements.length) {
    allcorrect = true;
  }

  const handleHelpneededBtnClicked = () => {
    setHelpNeeded(!helpneeded);
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <p> {introduction[0]?.value}</p>

        <Droppable droppableId="list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {statements?.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <DragandDropItem
                        statements={statements}
                        helpneeded={helpneeded}
                        text={item.value}
                        allcorrect={allcorrect}
                        iscorrect={item.iscorrect}
                      ></DragandDropItem>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <HelpBtn onClick={handleHelpneededBtnClicked}>Help </HelpBtn>
    </Wrapper>
  );
}

export default DragandDropMain;

const Box = styled.p`
  // display: flex;
  // flex-direction: row;
  // align-items: center;
  // // height: 40px;
  // // width: 40x;
  // box-shadow: rgba(0, 0, 0, 0.39) 0px 2px 4px,
  //   rgba(39, 106, 245, 0.3) 0px 7px 10px -3px,
  //   rgba(39, 106, 245, 0.1) 0px -3px 0px inset;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 50px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 0.29);
  }

  &:active {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 0.29);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  width: 100%;

  p {
    text-align: center;
    font-size: 15px;
  }

  // @media ${device.mobileS} {
  //   width: 100%;
  //   p {
  //     font-size: 16px;
  //   }
`;
