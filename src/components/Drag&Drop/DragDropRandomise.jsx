import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ResetBtn from "../Buttons/ResetBtn";
import DragandDropMain from "./DragandDropMain";
import { device } from "../../styles/breakpoints";

function DragDropRandomise({ data, updateStateFunctions }) {
  const [reset, setReset] = useState(false);
  const [sorted, setSorted] = useState([]);

  const { rerunRandomiseRequired } = updateStateFunctions;

  // create random nums

  useEffect(() => {
    const obj = [
      { number: Math.random(), value: data.position_0, id: "00" },
      { number: Math.random(), value: data.position_1, id: "01" },
      { number: Math.random(), value: data.position_2, id: "02" },
      { number: Math.random(), value: data.position_3, id: "03" },
      { number: Math.random(), value: data.position_4, id: "04" },
      { number: Math.random(), value: data.position_5, id: "05" },
      { number: Math.random(), value: data.position_6, id: "06" },
      { number: Math.random(), value: data.position_7, id: "07" },
      { number: Math.random(), value: data.position_8, id: "09" },
      { number: Math.random(), value: data.position_9, id: "10" },
      { value: data.introduction, id: "11" },
    ];

    // remove empty input fields
    const removeblanks = obj?.filter((item) => item.value !== undefined);
    const sortedarr = removeblanks.sort((a, b) => a.number - b.number);

    setSorted(sortedarr);
  }, [reset, data, rerunRandomiseRequired]);

  //  place in a use effect to allow re- render on reset

  return (
    <Wrapper>
      <DragandDropMain
        updateStateFunctions={updateStateFunctions}
        isAlgebra={data.isAlgebra}
        totalMarksAvailable={data.total_marks_available}
        reset={reset}
        randomisedorderitemsarr={sorted}
      ></DragandDropMain>
      <ResetBtn
        onClick={() => {
          setReset(!reset);
        }}
      ></ResetBtn>
    </Wrapper>
  );
}

export default DragDropRandomise;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 40px;
  width: 100%;

  @media ${device.mobileL} {
    height: 100%;
  }
`;
