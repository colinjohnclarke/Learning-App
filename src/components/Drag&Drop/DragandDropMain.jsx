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
  const [itemsarerandom, setItemsAreRandom] = useState(false);

  const [randomisedlist, setRandomisedList] = useState([]);

  const [allcorrect, setAllCorrect] = useState(false);

  const {
    index0AnswerisCorrect,
    setindex0AnswerisCorrect,
    setindex1AnswerisCorrect,
    setrerunRandomiseRequired,
  } = useContext(DragandDropContext);

  const data = props.randomisedorderitemsarr;

  const index = props.index;

  useEffect(() => {
    const getintro = data.filter((item) => item.id === "11");
    setIntroduction(getintro);

    const getstatements = data.filter((item) => item.id < "10");

    setStatements(getstatements);
  }, [data]);

  const handleOnDragEnd = (result) => {
    console.log(result);
    setDestinationIndex(result.destination.index);
    setItemDragged(result.draggableId);

    console.log(result);

    if (!result.destination) return;
    if (!result.destination.index) return;

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

  let correctstatements = 0;

  let checkstatments = statements.forEach((item, index) => {
    if (item.id == index) {
      correctstatements += 1;
    }
  });
  console.log(itemsarerandom);

  useEffect(() => {
    // check if order items == length of array
    if (correctstatements === statements.length) {
      // rerun runction set via context
      setrerunRandomiseRequired((val) => !val);
    } else {
      // set items to be mapped as randomised list
      setRandomisedList((val) => statements);

      setItemsAreRandom((val) => true);

      console.log("ok");
    }
  }, [data]);

  useEffect(() => {
    if (correctstatements == statements.length && itemsarerandom) {
      setAllCorrect((val) => true);
      console.log("checked");
    }
  }, [destinationindex, itemdragged]);

  useEffect(() => {
    //set context state for score component to update for index 0

    if (allcorrect && index === 0 && itemsarerandom) {
      setindex0AnswerisCorrect((val) => true);
    }

    // return () => {
    //   setindex0AnswerisCorrect((val) => false);
    // };
  }, [allcorrect]);

  // index 1

  useEffect(() => {
    // check initial render for all times being in correct order at index 1
    if (allcorrect && index === 1 && itemsarerandom) {
      setindex1AnswerisCorrect((val) => true);
      console.log("caught");
    }

    // return () => {
    //   setindex1AnswerisCorrect((val) => false);
    // };
  }, [allcorrect]);

  const handleHelpneededBtnClicked = () => {
    setHelpNeeded(!helpneeded);
  };

  console.log("randomisedlist", randomisedlist);

  return (
    <Wrapper>
      <p> random? {JSON.stringify(itemsarerandom)}</p>
      <p> all correct {JSON.stringify(allcorrect)}</p>
      <p> length {JSON.stringify(statements.length)}</p>
      <p>correct statements{JSON.stringify(correctstatements)}</p>

      <ScoreDragandDrop index={index}></ScoreDragandDrop>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <p> {introduction[0]?.value}</p>
        <Droppable droppableId="list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {randomisedlist?.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <DragandDropItem
                        statements={randomisedlist}
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
