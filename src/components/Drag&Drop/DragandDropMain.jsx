import React, { useState, useEffect, useContext, Children } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import "animate.css";
import DragandDropItem from "./DragandDropItem";
import { device } from "../../styles/breakpoints";
import HelpBtn from "../Buttons/HelpBtn";
import ScoreDragandDrop from "../Data/CurrentQuestionScores/ScoreDragandDrop";
import { DragandDropContext } from "./DragandDropContext";

function DragandDropMain(props) {
  const [introduction, setIntroduction] = useState([]);
  const [statements, setStatements] = useState([]);
  const [destinationindex, setDestinationIndex] = useState();
  const [itemdragged, setItemDragged] = useState();
  const [helpneeded, setHelpNeeded] = useState(false);
  const [itemsarerandom, setItemsAreRandom] = useState(false);

  const [randomisedlist, setRandomisedList] = useState([]);

  const [correctstatementsnum, setCorrectStatementsNum] = useState(0);
  const [functionhasrerun, setFunctionhasRerun] = useState(false);

  const [allcorrect, setAllCorrect] = useState(false);

  const totalMarksAvailable = props.totalMarksAvailable;

  const {
    index0AnswerisCorrect,
    setindex0AnswerisCorrect,
    setindex1AnswerisCorrect,
    setrerunRandomiseRequired,
    rerunRandomiseRequired,
  } = useContext(DragandDropContext);

  const data = props.randomisedorderitemsarr;

  const index = props.index;

  // initial fuction to pass dara and split question and statements from props and save in state
  useEffect(() => {
    setCorrectStatementsNum((val) => 0);
    const getintro = data.filter((item) => item.id === "11");
    setIntroduction(getintro);

    const getstatements = data.filter((item) => item.id < "10");

    setStatements(getstatements);
  }, [data]);

  // handle drag function
  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setDestinationIndex(result.destination.index);
    setItemDragged(result.draggableId);

    // make a intermediate copy of state to update
    const newlist = randomisedlist;

    // console.log("newlist", newlist);
    // remove the dragged item from list at source
    const [reorderedItem] = newlist.splice(result.source.index, 1);
    // append the new item to arr
    newlist.splice(result.destination.index, 0, reorderedItem);
    // set updated state to be re-mapped

    // map new statemnts into an object and state if true
    const checkindividualstatments = newlist.map((item, index) => {
      if (item.id == index) {
        return { id: item.id, iscorrect: true, value: item.value };
      } else {
        return { id: item.id, iscorrect: false, value: item.value };
      }
    });

    console.log("checkindividualstatments", checkindividualstatments);

    // upate the  randomisedlist array with current order after drag and drop
    setRandomisedList(checkindividualstatments);
  };

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
      setRandomisedList((val) => statements);

      // if the array is = to length and the value is not 0 then this must mean statements are in correct order therefore require re run function   setrerunRandomiseRequired((val) => !val);  which is a function set context value
    } else if (
      answerArr.length === statements.length &&
      statements.length !== 0 &&
      !itemsarerandom
    ) {
      setrerunRandomiseRequired((val) => !val);

      console.log(
        "items are NOT random,  setrerunRandomiseRequired((val) => !val);"
      );
    }

    console.log(answerArr.length, statements.length);

    randomisedlist.forEach((item, index) => {
      if (item.id == index) {
        console.log("index", index);
        setCorrectStatementsNum((val) => val + 1);
      }
    });
  }, [statements]);

  // console.log("randomisedlist", randomisedlist);

  // console.log("randomsied arr", randomisedlist);

  // checking number of statements in randomisedlist that are in the correct order and setting them as state
  useEffect(() => {
    setCorrectStatementsNum((val) => 0);
    randomisedlist.forEach((item, index) => {
      if (item.id == index) {
        setCorrectStatementsNum((val) => val + 1);
      }
    });
  }, [destinationindex, itemdragged, randomisedlist]);

  // if the items are random and ordered and correct statement value = the length of the statement arr

  useEffect(() => {
    if (correctstatementsnum == statements.length && itemsarerandom) {
      setAllCorrect((val) => true);
      console.log("checked");
    }
  }, [correctstatementsnum]);

  //

  useEffect(() => {
    //set context state for score component to update for index 0

    if (allcorrect && index === 0) {
      // confim index 0 drag and drop is correct
      setindex0AnswerisCorrect((val) => true);
    }

    // return () => {
    //   setindex0AnswerisCorrect((val) => false);
    // };
  }, [allcorrect]);

  // index 1

  useEffect(() => {
    // check initial render for all times being in correct order at index 1
    if (allcorrect && index === 1) {
      setindex1AnswerisCorrect((val) => true);
    }

    // return () => {
    //   setindex1AnswerisCorrect((val) => false);
    // };
  }, [allcorrect]);

  const handleHelpneededBtnClicked = () => {
    setHelpNeeded(!helpneeded);
  };

  const numberBorder = statements.map((item, index) => {
    return (
      <BorderNum>
        <Num>{index}</Num>
      </BorderNum>
    );
  });

  console.log("numberBorder", numberBorder);

  let list = randomisedlist?.map((item, index) => (
    <div style={{ width: "100%" }}>
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
          <div
            draggableId={item.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <DragandDropItem
              helpneeded={helpneeded}
              text={item.value}
              allcorrect={allcorrect}
              iscorrect={item.iscorrect}
            ></DragandDropItem>
          </div>
        )}
      </Draggable>
    </div>
  ));

  return (
    <Wrapper>
      <ScoreDragandDrop
        totalMarksAvailable={totalMarksAvailable}
        index={index}
      ></ScoreDragandDrop>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <p> {introduction[0]?.value}</p>
        <Droppable droppableId="list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((item, index) => {
                return (
                  <BorderNum>
                    <Num>{index + 1}</Num>
                    {item}
                  </BorderNum>
                );
              })}

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

const Border = styled.div`
  // height: 100px;
`;

const BorderNum = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  width: 100%;

  align-items: center;
  padding: 5px;

  @media ${device.tablet} {
    width: 700px;
  }
  @media ${device.desktop} {
    width: 800px;
  }
`;

const Num = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  height: 8px;
  width: 8px;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid green;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  transition: 0.3s;
  // background-color: rgba(0, 200, 200, 0.8);
  border: 2px solid rgba(0, 200, 200, 0.8);
  color: rgba(0, 200, 200, 0.8);
  font-weight: 400;

  @media ${device.tablet} {
    margin: 20px;
  }
  @media ${device.desktop} {
    margin: 30px;
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
    font-size: 15px;
  }

  // @media ${device.mobileS} {
  //   width: 100%;
  //   p {
  //     font-size: 16px;
  //   }
`;
