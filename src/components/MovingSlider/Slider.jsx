import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { colors, correctstyle } from "../../styles/colors";
import { SliderContext } from "./SliderContext";

import {
  index0correctanswerselected,
  index0correctanswerUNselected,
  index0EmptyArr,
  initialRenderCompleted,
  rerunRandomiseRequired,
} from "../../features/Slider/sliderindex0slice";

function Slider(props) {
  const position = props.position;
  const resetselected = props.resetselected;

  const pairNumber = props.pairNumber;

  const [repositionFocusBox, setRepositionFocusBox] = useState();
  const [slideriscorrect, setSliderIsCorrect] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  const [slidersarerandom, setSlidersAreRandom] = useState(false);

  const {
    index0AnswerisCorrect,
    setIndex0AnswerIsCorrect,
    index0AnswerisInCorrect,
    setIndex0AnswerIsInCorrect,
    rerunRandomiseRequired,
    setrerunRandomiseRequired,
  } = useContext(SliderContext);

  const setNum = Math.random();
  let setbool;
  if (setNum > 0.5) {
    setbool = true;
  } else setbool = false;

  const [rightisselected, setRightisSelected] = useState(setbool);
  const [leftisselected, setLeftisSelected] = useState(!setbool);

  const sliderLeftIsCorrect = props.sliderLeftIsCorrect;
  const sliderRightIsCorrect = props.sliderRightIsCorrect;

  const dispatch = useDispatch();

  const textleft = props.textleft;
  const textright = props.textright;

  // let correct = {
  //   transition: "0.3s",
  //   // position: "absolute",
  //   transpose: "translateY(4px)",
  //   backgroundColor: colors.correctColor,
  //   opacity: "1",
  // };

  const generalStyle = {};

  // const initialBoxStyle = {
  //   transition: "0.3s",
  //   position: "absolute",
  //   transpose: "translateX(-250px)",

  //   opacity: "0.4",
  // };

  // const [initialrenderCompleted, setInitialRenderCompleted] = useState(false);

  const isinitialRenderCompleted = useSelector(
    (state) => state.sliderreducerindex0.renderCompleted
  );

  const correctanswerArr = useSelector(
    (state) => state.sliderreducerindex0.value.length
  );

  // initial render check to see which statements are set to the correct poisition and update redux store that initial render is completed

  useEffect(() => {
    console.log("INITAL RENDER FN");

    if (leftisselected && sliderLeftIsCorrect) {
      dispatch(index0correctanswerselected({ payload: textleft }));
      // console.log("textleft is Correct", textleft);
      // console.log("leftisselected", leftisselected);

      // console.log("textleft is Correct");
    } else if (rightisselected && sliderRightIsCorrect) {
      dispatch(index0correctanswerselected({ payload: textright }));
      //   console.log("textright is Correct", textright);
      //   console.log("righis selected", rightisselected);
      // }
      // console.log("right left is Correct");
    }
    dispatch(initialRenderCompleted());

    // return () => {
    //   dispatch(index0EmptyArr());
    //   console.log("clean up function initial render");
    // };
  }, [props]);

  // function to remount the component when the initial selected slider for all sliders is correct

  useEffect(() => {
    console.log("CHECK IF RE RUN REQUIRED");
    if (isinitialRenderCompleted) {
      // if the length of ansarr == pair number then all slides were randomly placed in the correct order so required re run of function, this is done by changing setreunrequired which is the dependency arr of the randomise function
      if (correctanswerArr === pairNumber) {
        setrerunRandomiseRequired((val) => !val);
        console.log("reun required");
      } else {
        setSlidersAreRandom((val) => !val);
        dispatch(index0EmptyArr());
      }
    }

    // return () => {
    //   dispatch(index0EmptyArr());
    //   console.log("clean up function rerrun function");
    // };
  }, [isinitialRenderCompleted]);

  // run check function below after each slider movement

  /////

  // first
  useEffect(() => {
    dispatch(index0EmptyArr());
    console.log("CHECK ITEMS");

    if (slidersarerandom) {
      if (leftisselected && sliderLeftIsCorrect) {
        dispatch(index0correctanswerselected({ payload: textleft }));
      } else if (rightisselected && sliderRightIsCorrect) {
        dispatch(index0correctanswerselected({ payload: textright }));
      } else if (leftisselected !== sliderLeftIsCorrect) {
        dispatch(index0correctanswerUNselected());
      }
    }
    // return () => {
    //   dispatch(index0EmptyArr());
    // };
  }, [slidersarerandom]);

  useEffect(() => {
    console.log("MOVED SLIDER");
    if (slidersarerandom) {
      if (leftisselected && sliderLeftIsCorrect) {
        dispatch(index0correctanswerselected({ payload: textleft }));
      } else if (rightisselected && sliderRightIsCorrect) {
        dispatch(index0correctanswerselected({ payload: textright }));
      } else if (
        leftisselected !== sliderLeftIsCorrect ||
        rightisselected !== sliderRightIsCorrect
      ) {
        dispatch(index0correctanswerUNselected());
      }
    }
  }, [leftisselected]);

  const clickHandler = () => {
    setLeftisSelected(!leftisselected);
    setRightisSelected(!rightisselected);
  };

  useEffect(() => {
    console.log("(correctanswerArr === pairNumber)");
    if (correctanswerArr === pairNumber) {
      setSliderIsCorrect((val) => true);
      console.log("all correct");
      setIsDisabled((val) => true);
    }
  }, [correctanswerArr]);

  let fontsize = "16px";

  // if (textleft.length > 40 && window.innerWidth < 400) {
  //   fontsize = "14px";
  // } else if (textleft.length > 30) {
  //   fontsize = "15px";
  // } else if (textleft.length === undefined) {
  //   fontsize = "16px";
  // }

  let leftTextStyle = {
    fontSize: fontsize,
    color: leftisselected ? "white" : "black",
    fontWeight: leftisselected ? "600" : "300",
  };

  let rightTextStyle = {
    fontSize: fontsize,
    color: rightisselected ? "white" : "black",
    fontWeight: rightisselected ? "600" : "300",
  };

  let style = {};
  if (!props.displaySlider) {
    style = { display: "none" };
  }

  return (
    <div>
      <Wrapper style={style}>
        <p>
          initial render completed : {JSON.stringify(isinitialRenderCompleted)}
        </p>
        <p>sliders are random : {JSON.stringify(slidersarerandom)}</p>
        <p> RE RUN randomise : {JSON.stringify(rerunRandomiseRequired)}</p>
        <p>slidersarerandom: {JSON.stringify(slidersarerandom)}</p>
        <p>correct: {correctanswerArr}</p>
        <p> pairs: {pairNumber}</p>
        <Outer
          // disabled={isDisabled}
          onClick={clickHandler}
        >
          <Box>
            <TextLeft>
              <p style={leftTextStyle}>{textleft}</p>
              <p> CORRECT {JSON.stringify(sliderLeftIsCorrect)}</p>
              <p> SELECTED {JSON.stringify(leftisselected)}</p>
            </TextLeft>
          </Box>

          <Box>
            <TextRight>
              <p style={rightTextStyle}>{textright}</p>
              <p>CORRECT {JSON.stringify(sliderRightIsCorrect)}</p>
              <p>SELECTED {JSON.stringify(rightisselected)}</p>
            </TextRight>
          </Box>

          <MovingBox
            style={
              correctanswerArr === pairNumber ? correctstyle : generalStyle
            }
            className={
              rightisselected
                ? "moving_box_right_position"
                : "moving_box_left_position"
            }
          ></MovingBox>
        </Outer>
      </Wrapper>
    </div>
  );
}

export default Slider;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Outer = styled.button`
  border: 2px solid red;
  outline: none;
  border: none;
  background-color: white;
  height: 70px;
  width: 90vw;
  max-width: 700px;
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 8px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

const Box = styled.div`
  max-width: 700px;
  height: 65px;
  width: 50%;
  border-radius: 40px;
  border: 0px solid;
  outline: none;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextLeft = styled.p`
  margin-right: 15px;
  padding: 2px;
  position: relative;
  z-index: 5;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextRight = styled.p`
  margin-left: 15px;
  padding: 2px;
  position: relative;
  z-index: 5;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MovingBox = styled.div`
  opacity: 0.8;
  height: 70px;
`;
