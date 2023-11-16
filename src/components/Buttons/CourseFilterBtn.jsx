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
  height: 25px;
  width: 25px;
  border-radius: 4px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background: linear-gradient(
    225deg,
    rgba(39, 106, 245, 0.5) 0%,
    rgba(0, 200, 200, 0.5) 100%
  );
`;
