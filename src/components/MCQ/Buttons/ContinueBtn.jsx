import React from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { settozero } from "../../../features/slider/sliderquestiondataSliceIndex0";

function ContinueBtn() {
  const dispatch = useDispatch();

  return <ContinueButton></ContinueButton>;
}

export default ContinueBtn;

const ContinueButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 50px;
  background-color: rgba(39, 106, 245, 0.3);
  color: white;
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
