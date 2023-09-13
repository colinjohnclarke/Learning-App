import React, {
  useState,
  useEffect,
  useContext,
  useSyncExternalStore,
} from "react";
import Slider from "./Slider";
import styled from "styled-components";
import ScoreSlider from "../../components/Data/CurrentQuestionScores/ScoreSlider";
import { SliderContext } from "./SliderContext";

function MovingSlider(props) {
  const [resetselected, setResetSelected] = useState(false);

  const [slider0leftIsCorrect, setslider0leftIsCorrect] = useState();
  const [slider0rightIsCorrect, setslider0rightIsCorrect] = useState();
  const [slider1leftIsCorrect, setslider1leftIsCorrect] = useState();
  const [slider1rightIsCorrect, setslider1rightIsCorrect] = useState();
  const [slider2leftIsCorrect, setslider2leftIsCorrect] = useState();
  const [slider2rightIsCorrect, setslider2rightIsCorrect] = useState();
  const [slider3leftIsCorrect, setslider3leftIsCorrect] = useState();
  const [slider3rightIsCorrect, setslider3rightIsCorrect] = useState();

  const {
    index0AnswerisCorrect,
    setIndex0AnswerIsCorrect,
    index0AnswerisInCorrect,
    setIndex0AnswerIsInCorrect,
    rerunRandomiseRequired,
    setrerunRandomiseRequired,
  } = useContext(SliderContext);

  // save props as const
  const sliderData = props.data;

  const pairNumber = props.data.number_of_pairs_entered;

  const index = props.index;

  useEffect(() => {
    // generate random vales to random ordering of the slider items on each refresh, in pairs, one pair for each slider, use these values to set which side recives the correct value and which incorrect  ( changes each time)
    const num1a = Math.random();
    const num1b = Math.random();
    const num2a = Math.random();
    const num2b = Math.random();
    const num3a = Math.random();
    const num3b = Math.random();
    const num4a = Math.random();
    const num4b = Math.random();

    // deterine which value is higher and assign a boolean for condition

    setslider0leftIsCorrect((val) => (num1a > num1b ? true : false));
    setslider0rightIsCorrect((val) => (num1a < num1b ? true : false));
    setslider1leftIsCorrect((val) => (num2a > num2b ? true : false));
    setslider1rightIsCorrect((val) => (num2a < num2b ? true : false));
    setslider2leftIsCorrect((val) => (num3a > num3b ? true : false));
    setslider2rightIsCorrect((val) => (num3a < num3b ? true : false));
    setslider3leftIsCorrect((val) => (num4a > num4b ? true : false));
    setslider3rightIsCorrect((val) => (num4a < num4b ? true : false));
  }, [props, rerunRandomiseRequired]);

  const handleResetBtnSelected = () => {
    setResetSelected(!resetselected);
  };

  // only diplay the number of sliders specified
  let displaySlider1 = false;
  let displaySlider2 = false;
  let displaySlider3 = false;
  let displaySlider4 = false;

  switch (sliderData.number_of_pairs_entered) {
    case 4:
      displaySlider4 = true;
      displaySlider3 = true;
      displaySlider2 = true;
      displaySlider1 = true;
      break;
    case 3:
      displaySlider3 = true;
      displaySlider2 = true;
      displaySlider1 = true;
      break;
    case 2:
      displaySlider2 = true;
      displaySlider1 = true;
      break;
    case 1:
      displaySlider1 = true;
      break;
    default:
      break;
  }

  return (
    <Wrapper>
      <h1> RERUN: {JSON.stringify(rerunRandomiseRequired)}</h1>

      <ScoreSlider pairNumber={pairNumber} index={index}></ScoreSlider>
      <p>{sliderData.question}</p>
      <Slider
        displaySlider={displaySlider1}
        pairNumber={props.data.number_of_pairs_entered}
        position={0}
        resetselected={resetselected}
        index={index}
        sliderLeftIsCorrect={slider0leftIsCorrect}
        sliderRightIsCorrect={slider0rightIsCorrect}
        textleft={
          slider0leftIsCorrect
            ? sliderData.Statement_1_correct_option
            : sliderData.Statement_1_incorrect_option
        }
        textright={
          slider0rightIsCorrect
            ? sliderData.Statement_1_correct_option
            : sliderData.Statement_1_incorrect_option
        }
      ></Slider>

      <Slider
        displaySlider={displaySlider2}
        pairNumber={props.data.number_of_pairs_entered}
        position={1}
        resetselected={resetselected}
        index={index}
        sliderLeftIsCorrect={slider1leftIsCorrect}
        sliderRightIsCorrect={slider1rightIsCorrect}
        textleft={
          slider1leftIsCorrect
            ? sliderData.Statement_2_correct_option
            : sliderData.Statement_2_incorrect_option
        }
        textright={
          slider1rightIsCorrect
            ? sliderData.Statement_2_correct_option
            : sliderData.Statement_2_incorrect_option
        }
      ></Slider>
      <Slider
        displaySlider={displaySlider3}
        pairNumber={props.data.number_of_pairs_entered}
        position={2}
        resetselected={resetselected}
        index={index}
        sliderLeftIsCorrect={slider2leftIsCorrect}
        sliderRightIsCorrect={slider2rightIsCorrect}
        textleft={
          slider2leftIsCorrect
            ? sliderData.Statement_3_correct_option
            : sliderData.Statement_3_incorrect_option
        }
        textright={
          slider2rightIsCorrect
            ? sliderData.Statement_3_correct_option
            : sliderData.Statement_3_incorrect_option
        }
      ></Slider>
      <Slider
        displaySlider={displaySlider4}
        pairNumber={props.data.number_of_pairs_entered}
        position={3}
        resetselected={resetselected}
        index={index}
        sliderLeftIsCorrect={slider3leftIsCorrect}
        sliderRightIsCorrect={slider3rightIsCorrect}
        textleft={
          slider3leftIsCorrect
            ? sliderData.Statement_4_correct_option
            : sliderData.Statement_4_incorrect_option
        }
        textright={
          slider3rightIsCorrect
            ? sliderData.Statement_4_correct_option
            : sliderData.Statement_4_incorrect_option
        }
      ></Slider>
    </Wrapper>
  );
}

export default MovingSlider;

const Wrapper = styled.div`
  border-top: 0.5px solid lightblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  position: relative;
  padding-top: 40px;
  width: 100%;
`;
