import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import "animate.css";
import DragandDropItem from "./DragandDropItem";
import { device } from "../../styles/breakpoints";
import HelpBtn from "../Buttons/HelpBtn";
import ScoreDragandDrop from "../scores/ScoreDragandDrop";
import { DragandDropContext } from "./DragandDropContext";

function DragandDropMain(props) {
  const [introduction, setIntroduction] = useState([]);
  const [statements, setStatements] = useState([]);
  const [destinationindex, setDestinationIndex] = useState();
  const [itemdragged, setItemDragged] = useState();
  const [helpneeded, setHelpNeeded] = useState(false);

  const { setindex0AnswerisCorrect, setindex1AnswerisCorrect } =
    useContext(DragandDropContext);

  const data = props.randomisedorderitemsarr;
  const index = props.index;

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

  useEffect(() => {
    //set context state for score component to update for index 0
    if (allcorrect && index === 0) {
      setindex0AnswerisCorrect((val) => true);
    }

    return () => {
      setindex0AnswerisCorrect((val) => false);
    };
  }, [allcorrect]);

  useEffect(() => {
    //set context state for score component to update for index 1
    if (allcorrect && index === 1) {
      setindex1AnswerisCorrect((val) => true);
    }

    return () => {
      setindex1AnswerisCorrect((val) => false);
    };
  }, [allcorrect]);

  const handleHelpneededBtnClicked = () => {
    setHelpNeeded(!helpneeded);
  };

  return (
    <Wrapper>
      <ScoreDragandDrop index={index}></ScoreDragandDrop>
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
