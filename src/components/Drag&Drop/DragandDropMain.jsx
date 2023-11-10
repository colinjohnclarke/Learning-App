import React, { useState, useEffect, useContext, Children } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import "animate.css";
import DragandDropItem from "./DragandDropItem";
import { device } from "../../styles/breakpoints";
import HelpBtn from "../Buttons/HelpBtn";
import Score from "../Data/CurrentQuestionScores/Score";
import { DragandDropContext } from "./DragandDropContext";

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function DragandDropMain(props) {
  const [introduction, setIntroduction] = useState([]);
  const [statements, setStatements] = useState([]);
  const [helpneeded, setHelpNeeded] = useState(false);
  const [itemsarerandom, setItemsAreRandom] = useState(false);
  const [listofstatments, setListofStatments] = useState([]);
  const [correctstatementsnum, setCorrectStatementsNum] = useState(0);
  const [allcorrect, setAllCorrect] = useState(false);
  const [dataobj, setDataObj] = useState([]);
  const totalMarksAvailable = props.totalMarksAvailable;

  const {
    index0AnswerisCorrect,
    setindex0AnswerisCorrect,
    index1AnswerisCorrect,
    setindex1AnswerisCorrect,
    setrerunRandomiseRequired,
    rerunRandomiseRequired,
  } = useContext(DragandDropContext);

  const data = props.randomisedorderitemsarr;

  const index = props.index;
  const isAlgebra = props.isAlgebra;

  // initial fuction to pass data and split question and statements from props and save in state
  useEffect(() => {
    setCorrectStatementsNum((val) => 0);
    const getintro = data.filter((item) => item.id === "11");
    setIntroduction(getintro);
    const getstatements = data.filter((item) => item.id < "10");
    setStatements(getstatements);
  }, [data]);

  // hooks for dnd sensors so can sense touch on touchscreen device
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  // iniital render set the arr randomised list

  useEffect(() => {
    setListofStatments((val) => statements);
  }, []);

  //
  function handleDragEnd(event) {
    // get objects from event
    const { active, over } = event;

    // check the item dragged wasnt dropped in the same position
    if (active.id !== over.id) {
      // create copy of current list

      let newList = listofstatments;

      // find indexes of moved item and its new location to be dropped
      const startPosition = newList.map((e) => e.id).indexOf(active.id);
      const endPosition = newList.map((e) => e.id).indexOf(over.id);

      // move item
      const updatedList = arrayMove(newList, startPosition, endPosition);

      // save the data object with details of if item is in the correct position
      setDataObj((val) => {
        updatedList.map((item, index) => {
          if (item.id == index) {
            return { id: item.id, iscorrect: true, value: item.value };
          } else {
            return { id: item.id, iscorrect: false, value: item.value };
          }
        });
      });

      // upate the  listofstatments array with current order after drag and drop
      setListofStatments((val) => {
        return updatedList;
      });
    }
  }

  // function to check that randomise function does not order statements in the correct order and if they are in correct order, re run the randomise function and re order

  useEffect(() => {
    let answerArr = [];

    // check if item index == index as this means they are in the correct position if so add to arr

    statements.forEach((item, index) => {
      if (item.id == index) {
        answerArr.push(index);
      }
    });

    // if the array is less than length the list must be randomised so set randomised list state

    if (answerArr.length < statements.length) {
      // confirm items are random in the state
      setItemsAreRandom((val) => true);
      setListofStatments((val) => statements);

      // if the array is = to length and the value is not 0 then this must mean statements are in correct order therefore require re run function   setrerunRandomiseRequired((val) => !val);  which is a function set context value
    } else if (
      answerArr.length === statements.length &&
      statements.length !== 0 &&
      !itemsarerandom
    ) {
      setrerunRandomiseRequired((val) => !val);
    }

    listofstatments.forEach((item, index) => {
      if (item.id == index) {
        setCorrectStatementsNum((val) => val + 1);
      }
    });
  }, [statements]);

  // checking number of statements in listofstatments that are in the correct order and setting them as state

  useEffect(() => {
    setCorrectStatementsNum((val) => 0);
    listofstatments.forEach((item, index) => {
      if (item.id == index) {
        setCorrectStatementsNum((val) => val + 1);
      }
    });
  }, [dataobj, listofstatments]);

  // if the items are random and ordered and correct statement value = the length of the statement arr

  useEffect(() => {
    if (correctstatementsnum == statements.length && itemsarerandom) {
      setAllCorrect((val) => true);
    }
  }, [correctstatementsnum]);

  //

  useEffect(() => {
    if (allcorrect && index === 0) {
      // confim index 0 drag and drop is correct
      setindex0AnswerisCorrect((val) => true);
    }

    //   // return () => {
    //   //   setindex0AnswerisCorrect((val) => false);
    //   // };
  }, [allcorrect]);

  // index 1

  useEffect(() => {
    //   // check initial render for all times being in correct order at index 1
    if (allcorrect && index === 1) {
      setindex1AnswerisCorrect((val) => true);
    }

    //   // return () => {
    //   //   setindex1AnswerisCorrect((val) => false);
    //   // };
  }, [allcorrect]);

  const handleHelpneededBtnClicked = () => {
    setHelpNeeded(!helpneeded);
  };

  return (
    <Wrapper>
      <Score
        scoreData={{ index0AnswerisCorrect, index1AnswerisCorrect }}
        totalMarksAvailable={totalMarksAvailable}
        index={index}
      ></Score>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Question> {introduction[0]?.value}</Question>
        <NumWrapper>
          {statements.map((item, index) => {
            return <NumBorder>{<Num>{index + 1}</Num>}</NumBorder>;
          })}
        </NumWrapper>
        <SortableContext
          disabled={allcorrect}
          strategy={verticalListSortingStrategy}
          items={listofstatments}
        >
          {listofstatments?.map((item, index) => (
            <DragandDropItem
              isAlgebra={isAlgebra}
              key={item.number}
              id={item.id}
              helpneeded={helpneeded}
              text={item.value}
              allcorrect={allcorrect}
              iscorrect={item.iscorrect}
            ></DragandDropItem>
          ))}
        </SortableContext>
      </DndContext>

      <HelpBtn onClick={handleHelpneededBtnClicked}>Help </HelpBtn>
    </Wrapper>
  );
}

export default DragandDropMain;

const NumBorder = styled.div`
  height: 80px;
  width: 95%;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  // border: 1px solid red;
`;

const NumWrapper = styled.div`
  display: none;

  @media ${device.mobileS} {
    display: none;
  }

  @media ${device.mobileM} {
    // border: 1px solid;
    position: absolute;
    display: flex;
    top: 110px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  @media ${device.mobileL} {
    // border: 1px solid;
    position: absolute;
    display: flex;
    top: 110px;
    left: 6px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  @media ${device.tablet} {
    // border: 1px solid;
    position: absolute;
    display: flex;
    top: 114px;
    left: 65px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const Num = styled.div`
position: absolute; 
// left: -80px; 

  display: flex;
  justify-content: center;
  align-items: center;
  height: 8px;
  width: 8px;
  padding: 10px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  transition: 0.3s;
  border: 2px solid rgba(0, 200, 200, 0.8);
  color: rgba(0, 200, 200, 0.8);
  font-weight: 400;

  @media ${device.tablet} {
  left: -10px; 
  }
  @media ${device.desktop} {
    left: -20px;
  }

 @media ${device.mobileS} {

    p {
      font-size: 16px;
    }

`;

const Wrapper = styled.div`
  // // border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  width: 100%;

  p {
    text-align: center;
    font-size: 16px;
  }

  // @media ${device.mobileS} {
  //   width: 100%;
  //   p {
  //     font-size: 16px;
  //   }
`;

const Question = styled.p`
  max-height: 20px;
  font-weight: 400;
  padding: 10px;
  text-align: center;
`;

// const ScrollLayer = styled.div`
//   border: 2px solid green;
//   position: relative;
//   background-color: red;
//   z-index: 0;
// `;
