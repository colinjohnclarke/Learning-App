import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import Text from "./Text";
import { device } from "../../styles/breakpoints";

import { useSelector, useDispatch } from "react-redux";
import {
  incrementindex0,
  decrementindex0,
  settozeroindex0,
} from "../../features/slider/sliderquestiondataSliceIndex0";
import {
  incrementindex1,
  decrementindex1,
  settozeroindex1,
} from "../../features/slider/sliderquestiondataSliceIndex1";

function SliderTextbox(props) {
  const [boxiselected, setBoxIsSelected] = useState(false);
  const [alloptionsselected, setAllOptionsSelected] = useState(false);

  // const [buttonstyle, setButtonStyle] = useState({});

  let buttonstyle = {};

  const isCorrect = props.isCorrect;
  const text = props.text;
  const reset = props.reset;
  const index = props.index;
  const dispatch = useDispatch();

  const getcurrentquestionnumIndex0 = useSelector(
    (state) => state.sliderquestiondataSliceIndex0reducer.value
  );

  const getcurrentquestionnumIndex1 = useSelector(
    (state) => state.sliderquestiondataSliceIndex1reducer.value
  );

  useEffect(() => {
    console.log("CORRECT", isCorrect);
    console.log("Index", index);
    console.log("Index", index);
    console.log("box is selected", boxiselected);

    if (index === 0 && boxiselected && isCorrect) {
      dispatch(incrementindex0());
    } else if (index === 0 && !boxiselected && isCorrect) {
      dispatch(decrementindex0());
    } else if (index === 0 && boxiselected && !isCorrect) {
      // jksjds
    } else if (index === 1 && boxiselected && isCorrect) {
      dispatch(incrementindex1());
    } else if (index === 1 && !boxiselected && isCorrect) {
      dispatch(decrementindex1());
    }

    // dispatch(decrement());

    // } else if (boxiselected && !isCorrect && getcurrentquestionnum === 0) {
    //   dispatch(settozero());
    // } else (boxiselected && !isCorrect && getcurrentquestionnum == 0) {
    //   dispatch(settozero());
  }, [boxiselected]);

  // if (getcurrentquestionnum > 4) {
  //   dispatch(settozeroindex0());
  // }

  let content;

  let selectedbuttonstyle = {
    transform: "translateY(3px)",
    color: "white",
    backgroundColor: "rgba(39, 106, 245, 0.7",
    boxShadow:
      "0 0 0 1px #6191C2 inset,0 0 0 2px rgba(255,255,255,0.15) inset,0 0 0 1px rgba(0,0,0,0.4)",
    transition: "0.2s",
  };

  let correctstyle = {
    color: "green",
    boxShadow:
      "0 0 0 1px #6698cb inset, 0 0 0 2px rgba(255,255,255,0.15) inset, 0 8px 0 0 rgba(137, 240, 158, 0.34), 0 8px 0 1px rgba(0,0,0,.4),0 8px 8px 1px rgba(0,0,0,0.5)",
    transition: "0.3s; ",
    backgroundColor: "rgba(137, 240, 158, 0.34)",
  };
  let incorrectstyle = {
    color: "red",
    boxShadow:
      "0 0 0 1px #6698cb inset, 0 0 0 2px rgba(255,255,255,0.15) inset, 0 8px 0 0 rgba(240, 137, 137, 0.34), 0 8px 0 1px rgba(220, 137, 137, 0.56),0 8px 8px 1px rgba(0,0,0,0.5)",
    transition: "0.3s; ",
    backgroundColor: "rgba(240, 137, 137, 0.34)",
  };

  const textboxclickedHandler = () => {
    console.log("handle clicked");

    setBoxIsSelected(!boxiselected);
  };

  if (boxiselected) {
    buttonstyle = selectedbuttonstyle;
  }

  // if (getcurrentquestionnum !== 4) {
  //   content = <></>;
  // } else if (getcurrentquestionnum === 4 && isCorrect) {
  //   content = <TiTickOutline style={{ height: "20px", color: "green" }} />;
  //   buttonstyle = correctstyle;
  // } else {
  //   content = <RxCross2 style={{ height: "20px", color: "red" }} />;
  //   buttonstyle = incorrectstyle;
  // }

  useEffect(() => {
    if (boxiselected && index === 0) {
      setBoxIsSelected(false);
      // dispatch(settozeroindex0());
    }
  }, [reset, setBoxIsSelected]);

  return (
    <TextBox onClick={textboxclickedHandler} style={buttonstyle}>
      <Text
        alloptionsselected={alloptionsselected}
        isCorrect={isCorrect}
        text={text}
      ></Text>
      {index === 0 ? getcurrentquestionnumIndex0 : getcurrentquestionnumIndex1}

      <div>{content}</div>
      <p>i ={index}</p>
    </TextBox>
  );
}

export default SliderTextbox;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  margin: 5px;
  border-radius: 20px;
  padding: 10px;
  transition: 0.3s;
  background-color: white;

  box-shadow: rgba(0, 200, 200, 0.39) 0px 2px 4px,
rgba(39, 106, 245, 0.3) 0px 7px 10px -3px,
rgba(39, 106, 245, 0.1) 0px -3px 0px inset;

    box-shadow: rgba(0, 200, 200, 0.39) 0px 2px 4px inset,
    0 0 0 2px rgba(0, 200, 200, 0.39) inset,
    0 8px 0 0 rgba(39, 106, 245, 0.3),
    0 8px 0 1px rgba(39, 106, 245, 0.3),
    0 8px 8px 1px rgba(39, 106, 245, 0.3);
    transition: 0.3s; 
;




  &:hover {
   
    transform: translateY(-3px);
    color: white;
    transition: 0.1s;
    background-color: rgba(39, 106, 245, 0.5);
  }

  p {
    font-size: 14px;
  }

  @media ${(device.mobileS, device.mobileM, device.mobileL)} {
    width: 100%;
    p {
      font-size: 16px;
    }

  }


  @media ${device.laptop} {
    width: 70%;
    p {
      font-size: 17px;
    }
`;
