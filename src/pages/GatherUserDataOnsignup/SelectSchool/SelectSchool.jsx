import React, { useState, useContext, useEffect } from "react";
import { useGetUserSchoolQuery } from "../../../redux/api/UserData/userSchool";
import styled from "styled-components";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { IoSchoolOutline } from "react-icons/io5";
import { UserContext } from "../../../App";
import InputField from "../UserNames/InputField";

function SelectSchool({ setSchool, school }) {
  const [schoolQuery, setSchoolQuery] = useState("");
  const [sendQuery, setSendQuery] = useState("");
  const [newOptionSelected, setNewOptionSelected] = useState(false);

  const { data, isLoading } = useGetUserSchoolQuery(sendQuery);

  useEffect(() => {
    if (schoolQuery.length > 5) {
      setSendQuery(schoolQuery);
    }
  }, [schoolQuery]);

  const { darkThemeActive, userData } = useContext(UserContext);
  let schoolSavedInDB = userData.user.schoolDetails.name;

  const schoolIcon = (
    <IoSchoolOutline
      stroke={darkThemeActive ? "black" : "white"}
      style={{ marginLeft: "15px" }}
    />
  );

  let searchResult;
  if (data && !isLoading && !newOptionSelected) {
    searchResult = data?.data.map((school) => (
      <OptionItem
        darkThemeActive={darkThemeActive}
        onClick={(e) => {
          setSchoolQuery((val) => school.name);
          localStorage.setItem("schoolName", school.name);
          localStorage.setItem("schoolLocalAuthority", school.la);
          localStorage.setItem("schoolTown", school.town);
          setSchool((val) => school);
          setNewOptionSelected((prev) => true);
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
  } else if (!data & !newOptionSelected) {
    searchResult = (
      <OptionItem darkThemeActive={darkThemeActive} style={{ height: "50px" }}>
        <p style={{ marginLeft: "10px", fontSize: "13px" }}>keep typing...</p>
      </OptionItem>
    );
  } else if (newOptionSelected) {
    searchResult = <></>;
  }

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <InputField
        setNewOptionSelected={setNewOptionSelected}
        icon={schoolIcon}
        placeholder={schoolSavedInDB ? schoolSavedInDB : "Start by typing"}
        setStateFN={setSchoolQuery}
        value={schoolQuery}
        text={"Select School"}
      ></InputField>

      {searchResult && schoolQuery && (
        <SearchResult>{searchResult}</SearchResult>
      )}
    </Wrapper>
  );
}

export default SelectSchool;

const Wrapper = styled.div`
  width: 100%;
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

const SearchResult = styled.div`
  position: absolute;
  z-index: 25;
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
  position: relative;
  z-index: 30;
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
