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

  useEffect(() => {
    const getintro = data.filter((item) => item.id === "11");
    setIntroduction(getintro);

    const getstatements = data.filter((item) => item.id < "10");

    setStatements(getstatements);
  }, [data]);

  const handleOnDragEnd = (result) => {
    setDestinationIndex(result.destination.index);
    setItemDragged(result.draggableId);

    if (!result.destination) return;

    // make a intermediate copy of state to update
    const newlist = randomisedlist;

    console.log("newlist", newlist);
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

    console.log("CHCEKC", checkindividualstatments);

    setRandomisedList(checkindividualstatments);
  };

  console.log(itemsarerandom);

  // setCorrectStatementsNum((val) => 0);

  useEffect(() => {
    const answerArr = [];
    let checkforOrder = statements.forEach((item, index) => {
      if (item.id === index) {
        answerArr.push(true);
      }
    });

    console.log("answerArr", answerArr);

    if (answerArr.length < statements.length) {
      setItemsAreRandom((val) => true);

      console.log("items are random");

      setRandomisedList((val) => statements);
    } else if (answerArr.length === statements.length) {
      setrerunRandomiseRequired((val) => !val);
      console.log("items are NOT random");
    }

    setCorrectStatementsNum((val) => 0);

    let checkstatments = randomisedlist.forEach((item, index) => {
      if (item.id == index) {
        setCorrectStatementsNum((val) => val + 1);
      }
    });
  }, [statements]);

  // console.log("randomsied arr", randomisedlist);

  // useEffect(() => {
  //   // let correctstatements = 0;
  //   // check if order items == length of array
  //   if (correctstatementsnum === statements.length && !itemsarerandom) {
  //     // rerun runction set via context
  //     setItemsAreRandom((val) => false);

  //     setrerunRandomiseRequired((val) => true);
  //     // setFunctionhasRerun((val) => true);

  //     console.log("rerun required");
  //   } else if (correctstatementsnum !== statements.length && !itemsarerandom) {
  //     // set items to be mapped as randomised list
  //     setRandomisedList((val) => statements);

  //     setItemsAreRandom((val) => true);

  //     console.log("ok");
  //   }
  // }, [correctstatementsnum]);

  useEffect(() => {
    setCorrectStatementsNum((val) => 0);
    let checkstatments = randomisedlist.forEach((item, index) => {
      if (item.id == index) {
        setCorrectStatementsNum((val) => val + 1);
      }
    });
  }, [destinationindex, itemdragged]);

  useEffect(() => {
    if (correctstatementsnum == statements.length && itemsarerandom) {
      setAllCorrect((val) => true);
      console.log("checked");
    }
  }, [correctstatementsnum]);

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
      console.log("index 1 correct ");
    }

    // return () => {
    //   setindex1AnswerisCorrect((val) => false);
    // };
  }, [allcorrect]);

  const handleHelpneededBtnClicked = () => {
    setHelpNeeded(!helpneeded);
  };

  return (
    <Wrapper>
      <p> random? {JSON.stringify(itemsarerandom)}</p>
      <p> all correct {JSON.stringify(allcorrect)}</p>
      <p> length {JSON.stringify(statements.length)}</p>
      <p>correct statements{JSON.stringify(correctstatementsnum)}</p>
      <p>re run req from context{JSON.stringify(rerunRandomiseRequired)}</p>
      <p>re run req function{JSON.stringify(functionhasrerun)}</p>
      <ScoreDragandDrop
        totalMarksAvailable={totalMarksAvailable}
        index={index}
      ></ScoreDragandDrop>
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
  posiion: relative;
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
