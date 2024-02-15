import React, { useState, useContext } from "react";
import { useGetUserSchoolQuery } from "../../../features/api/UserData/userSchool";
import styled from "styled-components";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { IoSchoolOutline } from "react-icons/io5";
import { UserContext } from "../../../App";

function SelectSchool({ setSchool }) {
  const [schoolQuery, setSchoolQuery] = useState("");
  const { data, isLoading } = useGetUserSchoolQuery(schoolQuery);
  const [selectedSchool, setSelectedSchool] = useState({});

  const [placeholderText, setPlaceHolderText] = useState("Start by typing...");

  const { darkThemeActive, userData } = useContext(UserContext);

  const schoolSavedInDB =
    userData?.user.schoolDetails.name || localStorage.getItem("schoolName");

  let searchResult;
  if (data && !isLoading) {
    searchResult = data?.data.map((school) => (
      <OptionItem
        darkThemeActive={darkThemeActive}
        onClick={(e) => {
          setSelectedSchool((val) => school);
          setPlaceHolderText((val) => school.name);
          setSchoolQuery((val) => "");

          localStorage.setItem("schoolName", school.name);
          localStorage.setItem("schoolLocalAuthority", school.la);
          localStorage.setItem("schoolTown", school.town);
          setSchool((val) => school);
        }}
        key={school.id}
      >
        {school.name && (
          <SchoolName darkThemeActive={darkThemeActive}>
            <p style={{ fontWeight: "500", fontSize: "13px" }}>{school.name}</p>
          </SchoolName>
        )}
        {school.town && school.la && (
          <SchoolLocation darkThemeActive={darkThemeActive}>
            <LocationInfo
              darkThemeActive={darkThemeActive}
              style={{ fontWeight: "300", fontSize: "12px" }}
            >
              {school.town}&nbsp;
            </LocationInfo>

            <LocationInfo
              darkThemeActive={darkThemeActive}
              style={{ fontWeight: "300", fontSize: "12px" }}
            >
              {" "}
              {school.la}
            </LocationInfo>
            <LocationInfo
              darkThemeActive={darkThemeActive}
              style={{ fontWeight: "300", fontSize: "12px" }}
            >
              {" "}
              &nbsp;{school.postcode}
            </LocationInfo>
          </SchoolLocation>
        )}
      </OptionItem>
    ));
  }

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      > */}{" "}
      <LabelText darkThemeActive={darkThemeActive}> Select School</LabelText>
      <IoSchoolOutline
        stroke={darkThemeActive ? "black" : "white"}
        style={{ marginLeft: "15px" }}
      />
      {/* </div> */}
      <Input
        darkThemeActive={darkThemeActive}
        style={{ fontSize: "12px" }}
        placeholder={schoolSavedInDB || "Start by typing"}
        value={schoolQuery}
        onChange={(e) => {
          setSchoolQuery(e.target.value);
        }}
        type="text"
      />
      {searchResult && schoolQuery && (
        <SearchResult>{searchResult}</SearchResult>
      )}
    </Wrapper>
  );
}

export default SelectSchool;

const Wrapper = styled.div`
  width: 100%;
  // min-width: 300px;

  position: relative;
  z-index: 22;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const SchoolName = styled.div`
  margin-top: 15px;
  padding: 0;
  margin: 0;
  background: transparent;

  p {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;

const SchoolLocation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background: transparent;
`;

const Input = styled.input`
  height: 40px;
  border-radius: 5px;
  // padding-left: 5px;
  width: 99.5%;
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
  border: none;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  &::placeholder {
    font-size: 13px;
    font-weight: 400;
    fontstyle: italic;
    letter-spacing: 0px;
    padding: 5px;
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const LabelText = styled.label`
  font-size: 13px;
  position: relative;
  right: 5px;
  background: transparent;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const SearchResult = styled.div`
  position: absolute;
  z-index: 2;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  transition: 0.1s;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  font-size: 13px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const OptionItem = styled.div`
  // height: 55px;
  padding: 3px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 2px -1px;

  &:hover {
    background-color: rgb(0, 245, 245, 0.4);
  }
`;

const LocationInfo = styled.p`
  margin: 0;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;
