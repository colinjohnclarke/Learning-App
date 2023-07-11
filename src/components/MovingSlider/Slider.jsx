import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { colors, correctstyle } from "../../styles/colors";
import { SliderContext } from "./SliderContext";
import ScoreSlider from "../scores/ScoreSlider";

import {
  index0correctanswerselected,
  index0correctanswerUNselected,
  index0EmptyArr,
  initialRenderCompleted,
} from "../../features/Slider/sliderindex0slice";

function Slider(props) {
  const resetselected = props.resetselected;
  const [repositionFocusBox, setRepositionFocusBox] = useState();

  const {
    index0AnswerisCorrect,
    setIndex0AnswerIsCorrect,
    index0AnswerisInCorrect,
    setIndex0AnswerIsInCorrect,
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
  const index = props.index;

  const textleft = props.textleft;
  const textright = props.textright;

  let correct = {
    transition: "0.3s",
    // position: "absolute",
    transpose: "translateY(4px)",
    backgroundColor: colors.correctColor,
    opacity: "1",
  };

  const generalStyle = {};

  const initialBoxStyle = {
    transition: "0.3s",
    position: "absolute",
    transpose: "translateX(-250px)",

    opacity: "0.4",
  };

  const [initialrenderCompleted, setInitialRenderCompleted] = useState(false);

  const isinitialRenderCompleted = useSelector(
    (state) => state.sliderreducerindex0.renderCompleted
  );

  const correctanswerArr = useSelector(
    (state) => state.sliderreducerindex0.value.length
  );

  useEffect(() => {
    if (isinitialRenderCompleted) {
      if (
        (leftisselected && sliderLeftIsCorrect) ||
        (rightisselected && sliderRightIsCorrect)
      ) {
        dispatch(index0correctanswerselected());
      }
    }

    // return () => {
    //   if (isinitialRenderCompleted) {
    //     if (
    //       (leftisselected && sliderLeftIsCorrect) ||
    //       (rightisselected && sliderRightIsCorrect)
    //     ) {
    //       dispatch(index0correctanswerUNselected());

    //       console.log("  return dispatch(index0correctanswerUNselected");
    //     }
    //   }
    // };
  }, [leftisselected, rightisselected]);

  useEffect(() => {
    if (isinitialRenderCompleted) {
      if (leftisselected !== sliderLeftIsCorrect) {
        dispatch(index0correctanswerUNselected());
      }
    }
    // return () => {
    //   if (isinitialRenderCompleted) {
    //     if (leftisselected !== sliderLeftIsCorrect) {
    //       dispatch(index0correctanswerselected());
    //       console.log("  return dispatch(index0correctanswerselected");
    //     }
    //   }
    // };
  }, [leftisselected, rightisselected]);

  useEffect(() => {
    if (correctanswerArr === 4) {
      console.log("allcorrect");

      // update context for score
      setIndex0AnswerIsCorrect((val) => true);
    }
  }, [leftisselected, rightisselected, correctanswerArr]);

  // useEffect(() => {
  //   // console.log(isSelected, isCorrect);
  //   // console.log({ text });
  //   if (
  //     (leftisselected && sliderLeftIsCorrect) ||
  //     (rightisselected && sliderRightIsCorrect)
  //   ) {
  //     dispatch(index0correctanswerselected());
  //     console.log("dispatch(index0correctanswerselected( FIRST));");
  //   }
  //   dispatch(initialRenderCompleted());

  //   return () => {
  //     if (
  //       (leftisselected && sliderLeftIsCorrect) ||
  //       (rightisselected && sliderRightIsCorrect)
  //     ) {
  //       dispatch(index0correctanswerUNselected());
  //       console.log("dispatch(index0correctanswerUNselected())");
  //     }
  //     console.log("return function fired");
  //   };
  // }, []);

  // const onLoading = () => {
  //   console.log(leftisselected, siderLeftisCorrect);
  //   console.log({ textleft });
  //   if (leftisselected && siderLeftisCorrect) {
  //     dispatch(index0correctanswerselected());
  //     console.log("dispatch(index0correctanswerselected( FIRST));");
  //   }
  //   console.log(rightisselected, sliderRightisCorrect);
  //   console.log({ textright });
  //   if (rightisselected && sliderRightisCorrect) {
  //     dispatch(index0correctanswerselected());
  //     console.log("dispatch(index0correctanswerselected( FIRST));");
  //   }

  //   dispatch(initialRenderCompleted());
  // };

  // useEffect(() => {
  //   onLoading();
  // }, []);
  useEffect(() => {
    if (
      (leftisselected && sliderLeftIsCorrect) ||
      (rightisselected && sliderRightIsCorrect)
    ) {
      dispatch(index0correctanswerselected());
      console.log("  dispatch(index0correctanswerselected());");
    }
    dispatch(initialRenderCompleted());
    console.log("  initialRenderCompleted();");

    // return () => {
    //   if (
    //     (leftisselected && sliderLeftIsCorrect) ||
    //     (rightisselected && sliderRightIsCorrect)
    //   ) {
    //     dispatch(index0correctanswerUNselected());
    //     console.log("  return dispatch(index0correctanswerUNselected());");
    //   }
    // };
  }, []);

  const clickHandler = () => {
    setLeftisSelected(!leftisselected);
    setRightisSelected(!rightisselected);
  };

  return (
    <div>
      <Wrapper>
        <Outer onClick={clickHandler}>
          <Box>
            <Text>
              <p style={{ fontSize: "12px" }}>{textleft}</p>
            </Text>
          </Box>

          <Box>
            <Text>
              <p style={{ fontSize: "12px" }}>{textright}</p>
            </Text>
          </Box>

          <MovingBox
            style={correctanswerArr === 4 ? correctstyle : generalStyle}
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

const Outer = styled.div`
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
  height: 70px;
  width: 50%;
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  padding: 6px;
  position: relative;
  z-index: 20;
  font-size: 15px;
`;

const MovingBox = styled.div`
  opacity: 0.8;
  height: 70px;
`;
