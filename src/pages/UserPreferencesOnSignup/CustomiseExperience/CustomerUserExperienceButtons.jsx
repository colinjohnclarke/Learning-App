import React, { useContext } from "react";
import styled from "styled-components";
import MainActionBtn from "../../../components/Buttons/MainActionBtn";
import { UserContext } from "../../../App";

function CustomerUserExperienceButtons() {
  const { darkThemeActive } = useContext(UserContext);

  return (
    <BtnDiv>
      <MainActionBtn
        darkThemeActive={darkThemeActive}
        // onClick={handleBackBtnClicked}
        style={{ width: "100%" }}
      >
        {" "}
        <p style={{ fontSize: "15px" }}>Previous</p>
      </MainActionBtn>
      <MainActionBtn
        onClick={(e) => {
          //   handleSaveBtnClicked(e);
        }}
        darkThemeActive={darkThemeActive}
        style={{ width: "100%" }}
      >
        {" "}
        <p style={{ fontSize: "15px" }}>Save</p>
      </MainActionBtn>
    </BtnDiv>
  );
}

export default CustomerUserExperienceButtons;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  // border: 1px solid;
  width: 100%;
  margin-top: 30px;
`;
