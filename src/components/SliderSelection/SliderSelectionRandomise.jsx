import React, { useEffect } from "react";
import styled from "styled-components";
import SliderTextbox from "./SliderTextbox";

function SliderSelectionRandomise(props) {
  const slider_data = props.data;

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

  useEffect(() => {
    console.log("num1a", num1a);
    console.log("num1b", num1b);
  }, []);

  return (
    <Wrapper>
      <h3>{slider_data.question}</h3>
      <Slider>
        <SliderTextbox
          isCorrect={slider1leftIsCorrect}
          text={
            slider1leftIsCorrect
              ? slider_data.Statement_1_correct_option
              : slider_data.Statement_1_incorrect_option
          }
        ></SliderTextbox>
        <SliderTextbox
          isCorrect={slider1rightIsCorrect}
          text={
            slider1rightIsCorrect
              ? slider_data.Statement_1_correct_option
              : slider_data.Statement_1_incorrect_option
          }
        ></SliderTextbox>
      </Slider>
      <Slider>
        <SliderTextbox
          isCorrect={slider2leftIsCorrect}
          text={
            slider2leftIsCorrect
              ? slider_data.Statement_2_correct_option
              : slider_data.Statement_2_incorrect_option
          }
        ></SliderTextbox>
        <SliderTextbox
          isCorrect={slider2rightIsCorrect}
          text={
            slider2rightIsCorrect
              ? slider_data.Statement_2_correct_option
              : slider_data.Statement_2_incorrect_option
          }
        ></SliderTextbox>
      </Slider>
      <Slider>
        <SliderTextbox
          isCorrect={slider3leftIsCorrect}
          text={
            slider3leftIsCorrect
              ? slider_data.Statement_3_correct_option
              : slider_data.Statement_3_incorrect_option
          }
        ></SliderTextbox>

        <SliderTextbox
          isCorrect={slider3rightIsCorrect}
          text={
            slider3rightIsCorrect
              ? slider_data.Statement_3_correct_option
              : slider_data.Statement_3_incorrect_option
          }
        ></SliderTextbox>
      </Slider>
      <Slider>
        <SliderTextbox
          isCorrect={slider4leftIsCorrect}
          text={
            slider4leftIsCorrect
              ? slider_data.Statement_4_correct_option
              : slider_data.Statement_4_incorrect_option
          }
        ></SliderTextbox>

        <SliderTextbox
          isCorrect={slider4rightisCorrect}
          text={
            slider4rightisCorrect
              ? slider_data.Statement_4_correct_option
              : slider_data.Statement_4_incorrect_option
          }
        ></SliderTextbox>
      </Slider>
    </Wrapper>
  );
}

export default SliderSelectionRandomise;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  text-align: center;
  transition: 0.3s;
`;

const Slider = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 90%;
  width: 95%;
  margin: 3px;

  border-radius: 30px;
`;
