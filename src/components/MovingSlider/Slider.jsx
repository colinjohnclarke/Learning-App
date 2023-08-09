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
} from "../../features/Slider/sliderindex0slice";

function Slider(props) {
  const position = props.position;
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
        console.log(" mount");
      } else if (leftisselected !== sliderLeftIsCorrect) {
        dispatch(index0correctanswerUNselected());
        console.log(" mount");
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
    if (leftisselected && sliderLeftIsCorrect) {
      dispatch(index0correctanswerselected({ payload: textleft }));
    } else if (rightisselected && sliderRightIsCorrect) {
      dispatch(index0correctanswerselected({ payload: textright }));
    }

    dispatch(initialRenderCompleted());

    return () => {
      dispatch(index0EmptyArr());
    };
  }, []);

  const clickHandler = () => {
    setLeftisSelected(!leftisselected);
    setRightisSelected(!rightisselected);
  };

  useEffect(() => {
    if (correctanswerArr === 4) {
      setIndex0AnswerIsCorrect((val) => true);
      console.log("all correct");
    }
  }, [correctanswerArr]);

  return (
    <div>
      <Wrapper>
        <Outer onClick={clickHandler}>
          <Box>
            <Text>
              <p style={{ fontSize: "12px" }}>{textleft}</p>
              {/* <p>{JSON.stringify(sliderLeftIsCorrect)}</p>
              <p>{JSON.stringify(leftisselected)}</p> */}
            </Text>
          </Box>

          <Box>
            <Text>
              <p style={{ fontSize: "12px" }}>{textright}</p>
              {/* <p>{JSON.stringify(sliderRightIsCorrect)}</p>
              <p>{JSON.stringify(rightisselected)}</p> */}
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
