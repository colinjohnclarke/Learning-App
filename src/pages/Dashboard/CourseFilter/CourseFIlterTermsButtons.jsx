import React, { useContext } from "react";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";

function CourseFIlterTermsButtons({ termsArr, setFilterTermsArr }) {
  const { darkThemeActive } = useContext(UserContext);

  const handleRemoveBtnClicked = (term) => {
 
    setFilterTermsArr((prevVal) => {
      const updated = { ...prevVal };
      delete updated[term];
      return updated;
    });
  };

  const searchTermsButtons = termsArr.map((term) => {
    return (
      <div
        className=" animate__animated animate__fadeIn animate__faster"
        darkThemeActive={darkThemeActive}
        style={{
          paddingLeft: "10px",
          height: "40px",
          minWidth: "150px",
          border: "1px solid rgb(0, 245, 245)",
          padding: "3px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "13px",
          margin: "2px",

          backgroundColor: darkThemeActive
            ? ThemeStyles.lightThemePrimaryBackgroundColor
            : ThemeStyles.darkThemeSecondaryBackgroundColor,

          boxShadow: darkThemeActive
            ? ThemeStyles.lightThemeMainBoxShadow
            : ThemeStyles.darkThemeMainBoxShadow,
        }}
      >
        {term}

        <RemoveBtn
          onClick={() => handleRemoveBtnClicked(term)}
          darkThemeActive={darkThemeActive}
        >
          {
            <CiCircleRemove
              fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
              darkThemeActive={darkThemeActive}
              size={30}
            />
          }
        </RemoveBtn>
      </div>
    );
  });
  return searchTermsButtons;
}

export default CourseFIlterTermsButtons;

const RemoveBtn = styled.button`
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor};
`;
