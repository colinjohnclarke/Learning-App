import React from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { device } from "../../styles/breakpoints";

function SearchCourse() {
  return (
    <Wrapper>
      <BsSearch />
      <Input type="text" placeholder="Search our courses..."></Input>
    </Wrapper>
  );
}

export default SearchCourse;

const Wrapper = styled.form`
  margin-top: 10px;
  height: 30px;
  width: 93%;
  max-width: 880px;
  background-color: white;
  border-radius: 5px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  font-size: 12px;
  color: red;

  @media ${device.tablet} {
    width: 99vw;
  }
  @media ${device.mobileL} {
    width: 96vw;
  }
  @media ${device.mobileM} {
    width: 94vw;
  }
`;

const Input = styled.input`
  height: 90%;
  width: 90%;
  border: none;
  outline: none;
  padding-left: 10px;
`;
