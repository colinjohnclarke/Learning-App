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
  index0position0selected,
  index0position1selected,
  index0position2selected,
  index0position3selected,
  resetposition0selection,
  resetposition1selection,
  resetposition2selection,
  resetposition3selection,
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
  const dispatch = useDispatch();
  const isCorrect = props.isCorrect;
  const text = props.text;
  const reset = props.reset;
  const index = props.index;
  const position = props.position;
  const left = props.left;
  const right = props.right;

  // get State of current question number correct from store
  const getcurrentquestionnumIndex0 = useSelector(
    (state) => state.sliderquestiondataSliceIndex0reducer.value
  );

  const getcurrentquestionnumIndex1 = useSelector(
    (state) => state.sliderquestiondataSliceIndex1reducer.value
  );

  // get current slider button selected eg LEFT OR RIGHT selected from state

  let getposition0selectedstate = useSelector(
    (state) =>
      state.sliderquestiondataSliceIndex0reducer.index0position0selected
  );

  let getposition1selectedstate = useSelector(
    (state) =>
      state.sliderquestiondataSliceIndex0reducer.index0position1selected
  );

  let getposition2selectedstate = useSelector(
    (state) =>
      state.sliderquestiondataSliceIndex0reducer.index0position2selected
  );

  let getposition3selectedstate = useSelector(
    (state) =>
      state.sliderquestiondataSliceIndex0reducer.index0position3selected
  );

  // this code slows the updating of redux state why? can we change it?

  // useEffect(() => {
  //   if (index === 0 && boxiselected && isCorrect) {
  //     dispatch(incrementindex0());
  //   } else if (index === 0 && !boxiselected && isCorrect) {
  //     dispatch(decrementindex0());
  //   } else if (
  //     index === 0 &&
  //     !boxiselected &&
  //     isCorrect &&
  //     reset === "resetindex0"
  //   ) {
  //     dispatch(settozeroindex0());
  //   } else if (index === 1 && boxiselected && isCorrect) {
  //     dispatch(incrementindex1());
  //   } else if (index === 1 && !boxiselected && isCorrect) {
  //     dispatch(decrementindex1());
  //   }
  // }, [boxiselected]);

  ///

  useEffect(() => {
    console.log("POSITION:", position);
    console.log("BOS IS SELECTED:", boxiselected);
    console.log("LEFT:", left);
    console.log("RIGHT:", right);

    // set btn objects for dispatch

    const leftbtnselected = { left: true, right: false };
    const rightbtnselected = { left: false, right: true };
    // position 0

    // setting selection according to LEFT btn selected
    if (position === 0 && boxiselected && left) {
      dispatch(index0position0selected(leftbtnselected));

      // RESETTING selection so both btns unselected
    } else if (
      (position === 0 && !boxiselected && left) ||
      (position === 0 && !boxiselected && right)
    ) {
      dispatch(resetposition0selection());

      // setting selection according to RIGHT btn selected
    } else if (position === 0 && boxiselected && right) {
      dispatch(index0position0selected(rightbtnselected));

      // position 1
    } else if (position === 1 && boxiselected && left) {
      dispatch(index0position1selected(leftbtnselected));
    } else if (
      (position === 1 && !boxiselected && left) ||
      (position === 1 && !boxiselected && right)
    ) {
      dispatch(resetposition1selection());
    } else if (position === 1 && boxiselected && right) {
      dispatch(index0position1selected(rightbtnselected));
    }

    //position 2
    else if (position === 2 && boxiselected && left) {
      dispatch(index0position2selected(leftbtnselected));
    } else if (
      (position === 2 && !boxiselected && left) ||
      (position === 2 && !boxiselected && right)
    ) {
      dispatch(resetposition2selection());
    }
    //
    else if (position === 2 && boxiselected && right) {
      dispatch(index0position2selected(rightbtnselected));
    }

    //position 3
    else if (position === 3 && boxiselected && left) {
      dispatch(index0position3selected(leftbtnselected));
    } else if (
      (position === 3 && !boxiselected && left) ||
      (position === 3 && !boxiselected && right)
    ) {
      dispatch(resetposition3selection());
    }
    //
    else if (position === 3 && boxiselected && right) {
      dispatch(index0position3selected(rightbtnselected));
    }
  }, [boxiselected]);

  // function to only allow either left or right button to be pressed at one time and other reset to non clicked state/ position


  // useEffect(() => {
  // if (getposition0selectedstate.left) {
  //   leftisSelected = true;
  //   rightisSelected = false;
  // } else if (getposition0selectedstate.right) {
  //   leftisSelected = false;
  //   rightisSelected = true;
  // }
  // useEffect(() => {
  //   console.log("left", leftisSelected);
  //   console.log("right", rightisSelected);
  // }, [boxiselected]);

  // ensuring either left box OR right is selected at any one time

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

  // RESET BUTTON

  useEffect(() => {
    console.log("reset changed", reset);
    if ((index === 0) & (reset === "resetindex0")) {
      dispatch(settozeroindex0());
    } else if (index === 1 && reset === "resetindex1") {
      dispatch(settozeroindex1());
    }
  }, [reset]);

  if (boxiselected) {
    buttonstyle = selectedbuttonstyle;
  }

  const textboxclickedHandler = (left, right) => {
    setBoxIsSelected(!boxiselected);
  };

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
      // setBoxIsSelected(false);
      // dispatch(settozeroindex0());
    }
  }, [reset, setBoxIsSelected]);

  return (
    <TextBox
      onClick={() => {
        textboxclickedHandler();
      }}
      style={buttonstyle}
    >
      <Text
        alloptionsselected={alloptionsselected}
        isCorrect={isCorrect}
        text={text}
      ></Text>
      {index === 0 ? getcurrentquestionnumIndex0 : getcurrentquestionnumIndex1}

      {/* <div>{content}</div> */}
      <p style={{ color: "red" }}>
        {JSON.stringify(getposition1selectedstate)}
      </p>
      {/* <p style={{ color: "red" }}>{leftisSelected}</p> */}
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
