import React from "react";
import { IoFilterOutline } from "react-icons/io5";
import styled from "styled-components";

function CourseFilterButton({ children, ...atributes }) {
  return (
    <Wrapper {...atributes}>
      <IoFilterOutline />
    </Wrapper>
  );
}

export default CourseFilterButton;

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  border-radius: 16px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: rgba(0, 250, 245, 0.5);
`;
