import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ResetBtn from "../Buttons/ResetBtn";

import DragandDropMain from "./DragandDropMain";

function DragDropRandomise(props) {
  const [reset, setReset] = useState(false);
  const [count, setCount] = useState(0);
  const [sorted, setSorted] = useState([]);

  const data = props.order_items_drag_drop;

  // create random nums

  useEffect(() => {
    const num1 = Math.random();
    const num2 = Math.random();
    const num3 = Math.random();
    const num4 = Math.random();
    const num5 = Math.random();
    const num6 = Math.random();
    const num7 = Math.random();
    const num8 = Math.random();
    const num9 = Math.random();
    const num10 = Math.random();

    const obj = [
      { number: num1, value: data.position_0, id: "00" },
      { number: num2, value: data.position_1, id: "01" },
      { number: num3, value: data.position_2, id: "02" },
      { number: num4, value: data.position_3, id: "03" },
      { number: num5, value: data.position_4, id: "04" },
      { number: num6, value: data.position_5, id: "05" },
      { number: num7, value: data.position_6, id: "06" },
      { number: num8, value: data.position_7, id: "07" },
      { number: num9, value: data.position_8, id: "09" },
      { number: num10, value: data.position_9, id: "9" },
      { value: data.introduction, id: "10" },
    ];

    const removeblanks = obj?.filter((item) => item.value !== undefined);

    const sortedarr = removeblanks.sort((a, b) =>
      a.number > b.number ? +1 : -1
    );

    setSorted(sortedarr);

    setCount(count + 1);
  }, [reset, data]);

  //  place in a use effect to allow re- render on reset

  return (
    <Wrapper>
      <DragandDropMain
        reset={reset}
        randomisedorderitemsarr={sorted}
      ></DragandDropMain>
      <ResetBtn
        onClick={() => {
          setReset(!reset);
        }}
      >
        <p>Reset</p>

        <h1>{count}</h1>
      </ResetBtn>
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
  transition: 0.3s;

  &:hover {
    background-color: rgba(39, 106, 245, 0.3);
    transform: translateY(-3px);
  }

  &:active {
    background-color: rgba(39, 106, 245, 0.3);
    transform: translateY(3px);
  }
`;
