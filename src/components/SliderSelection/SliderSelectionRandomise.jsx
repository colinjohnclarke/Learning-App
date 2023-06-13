import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SliderTextbox from "./SliderTextbox";
import { memo } from "react";
import { device } from "../../styles/breakpoints";
import { useDispatch, useSelector } from "react-redux";
import {
  settozeroindex0,
  // index0position0selected,
  // index0position1selected,
  // index0position2selected,
  // index0position3selected,
} from "../../features/slider/sliderquestiondataSliceIndex0";
import { settozeroindex1 } from "../../features/slider/sliderquestiondataSliceIndex1";
import ContinueBtn from "../MCQ/Buttons/ContinueBtn";

const SliderSelectionRandomise = memo(function SliderSelectionRandomise(props) {
  const [reset, setReset] = useState("");

  const dispatch = useDispatch();

  const slider_data = props.data;

  const index = props.index;

  const num1a = Math.random();
  const num1b = Math.random();
  const num2a = Math.random();
  const num2b = Math.random();
  const num3a = Math.random();
  const num3b = Math.random();
  const num4a = Math.random();
  const num4b = Math.random();

  const slider1leftIsCorrect = num1a > num1b ? true : false;

  const slider1rightIsCorrect = num1a < num1b ? true : false;

  const slider2leftIsCorrect = num2a > num2b ? true : false;

  const slider2rightIsCorrect = num2a < num2b ? true : false;

  const slider3leftIsCorrect = num3a > num3b ? true : false;

  const slider3rightIsCorrect = num3a < num3b ? true : false;

  const slider4leftIsCorrect = num4a > num4b ? true : false;

  const slider4rightisCorrect = num4a < num4b ? true : false;

  // let getposition0selectedstate = useSelector(
  //   (state) =>
  //     state.sliderquestiondataSliceIndex0reducer.index0position0selected
  // );

  // let getposition1selectedstate = useSelector(
  //   (state) =>
  //     state.sliderquestiondataSliceIndex0reducer.index0position1selected
  // );


  // let getposition2selectedstate = useSelector(
  //   (state) =>
  //     state.sliderquestiondataSliceIndex0reducer.index0position2selected
  // );

  // let getposition3selectedstate = useSelector(
  //   (state) =>
  //     state.sliderquestiondataSliceIndex0reducer.index0position3selected
  // );

  const handlereset = () => {
    if (index === 0) {
      setReset("resetindex0");

      setTimeout(() => {
        setReset("");
        // console.log("index0timer");
      }, 0);

      // dispatch(settozeroindex0());
    } else if (index === 1) {
      setReset("resetindex1");
      // dispatch(settozeroindex1());

      setTimeout(() => {
        setReset("");
        // console.log("index1timer");
      }, 0);
    }
  };

  return (
    <Wrapper>
      <p>{slider_data.question}</p>
      <Slider>
        <Number>
          <p>1</p>
        </Number>

        <SliderTextbox
          left={true}
          right={false}
          position={0}
          index={index}
          reset={reset}
          isCorrect={slider1leftIsCorrect}
          text={
            slider1leftIsCorrect
              ? slider_data.Statement_1_correct_option
              : slider_data.Statement_1_incorrect_option
          }
        ></SliderTextbox>
        <Vs>vs</Vs>
        <SliderTextbox
          left={false}
          right={true}
          position={0}
          index={index}
          reset={reset}
          isCorrect={slider1rightIsCorrect}
          text={
            slider1rightIsCorrect
              ? slider_data.Statement_1_correct_option
              : slider_data.Statement_1_incorrect_option
          }
        ></SliderTextbox>
      </Slider>
      <Slider>
        <Number>
          <p>2</p>
        </Number>
        <SliderTextbox
          left={true}
          right={false}
          position={1}
          index={index}
          reset={reset}
          isCorrect={slider2leftIsCorrect}
          text={
            slider2leftIsCorrect
              ? slider_data.Statement_2_correct_option
              : slider_data.Statement_2_incorrect_option
          }
        ></SliderTextbox>
        <Vs>vs</Vs>
        <SliderTextbox
          left={false}
          right={true}
          position={1}
          index={index}
          reset={reset}
          isCorrect={slider2rightIsCorrect}
          text={
            slider2rightIsCorrect
              ? slider_data.Statement_2_correct_option
              : slider_data.Statement_2_incorrect_option
          }
        ></SliderTextbox>
      </Slider>
      <Slider>
        <Number>
          <p>3</p>
        </Number>
        <SliderTextbox
          left={true}
          right={false}
          position={2}
          index={index}
          reset={reset}
          isCorrect={slider3leftIsCorrect}
          text={
            slider3leftIsCorrect
              ? slider_data.Statement_3_correct_option
              : slider_data.Statement_3_incorrect_option
          }
        ></SliderTextbox>
        <Vs>vs</Vs>
        <SliderTextbox
          left={false}
          right={true}
          position={2}
          index={index}
          reset={reset}
          isCorrect={slider3rightIsCorrect}
          text={
            slider3rightIsCorrect
              ? slider_data.Statement_3_correct_option
              : slider_data.Statement_3_incorrect_option
          }
        ></SliderTextbox>
      </Slider>
      <Slider>
        <Number>
          <p>4</p>
        </Number>
        <SliderTextbox
          left={true}
          right={false}
          position={3}
          index={index}
          reset={reset}
          isCorrect={slider4leftIsCorrect}
          text={
            slider4leftIsCorrect
              ? slider_data.Statement_4_correct_option
              : slider_data.Statement_4_incorrect_option
          }
        ></SliderTextbox>
        <Vs>vs</Vs>
        <SliderTextbox
          left={false}
          right={true}
          position={3}
          index={index}
          reset={reset}
          isCorrect={slider4rightisCorrect}
          text={
            slider4rightisCorrect
              ? slider_data.Statement_4_correct_option
              : slider_data.Statement_4_incorrect_option
          }
        ></SliderTextbox>
      </Slider>
      <Btn
        onClick={() => {
          handlereset();
        }}
      >
        <p>Reset</p>
      </Btn>
      <Btn
        onClick={() => {
          console.log("CONTNUE");
        }}
      >
        Continue
      </Btn>
    </Wrapper>
  );
});
export default SliderSelectionRandomise;

const Wrapper = styled.div`
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  text-align: center;

  p {
    font-size: 17px;
  }
`;

const Slider = styled.div`
  max-width: 700px;
  width: 98%;
  display: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 3px;
  border-radius: 20px;
  padding: 10px;

  @media ${(device.mobileS, device.mobileM)} {
    box-shadow: rgba(0, 200, 200, 0.39) 0px 2px 4px,
      rgba(39, 106, 245, 0.3) 0px 7px 10px -3px,
      rgba(39, 106, 245, 0.1) 0px -3px 0px inset;
    width: 90%;
  }
`;

const Number = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-around;
  height: 50px;
  width: 50px;
  position: relative;
`;

const Vs = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 30px;
  width: 30px;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 50px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.39) 0px 2px 4px,
    rgba(39, 106, 245, 0.3) 0px 7px 10px -3px,
    rgba(39, 106, 245, 0.1) 0px -3px 0px inset;
  border: none;
  transition: 0.1s;
  margin: 20px;

  &:hover {
    background-color: rgba(39, 106, 245, 0.3);
    transform: translateY(-3px);
  }

  &:active {
    background-color: rgba(39, 106, 245, 0.3);
    transform: translateY(3px);
    transition: 0.1s;
  }
`;
