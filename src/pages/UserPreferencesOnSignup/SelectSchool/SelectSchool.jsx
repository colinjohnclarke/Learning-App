import React, { useState } from "react";
import { useGetUserSchoolQuery } from "../../../features/api/UserData/userSchool";
import styled from "styled-components";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { IoSchoolOutline } from "react-icons/io5";

function SelectSchool() {
  const [schoolQuery, setSchoolQuery] = useState("");
  const { data, isLoading } = useGetUserSchoolQuery(schoolQuery);
  const [selectedSchool, setSelectedSchool] = useState({});

  const [placeholderText, setPlaceHolderText] = useState("Start by typing...");

  let searchResult;
  if (data && !isLoading) {
    searchResult = data?.data.map((school) => (
      <OptionItem
        onClick={(e) => {
          setSelectedSchool((val) => school);
          setPlaceHolderText((val) => school.name);
          setSchoolQuery((val) => "");

          console.log(e.target.value);
        }}
        key={school.id}
      >
        {school.name && (
          <SchoolName>
            <p style={{ fontWeight: "500", fontSize: "13px" }}>{school.name}</p>
          </SchoolName>
        )}
        {school.town && school.la && (
          <SchoolLocation>
            <LocationInfo style={{ fontWeight: "300", fontSize: "12px" }}>
              {school.town}&nbsp;
            </LocationInfo>

            <LocationInfo style={{ fontWeight: "300", fontSize: "12px" }}>
              {" "}
              {school.la}
            </LocationInfo>
            <LocationInfo style={{ fontWeight: "300", fontSize: "12px" }}>
              {" "}
              &nbsp;{school.postcode}
            </LocationInfo>
          </SchoolLocation>
        )}
      </OptionItem>
    ));
  }

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: "10px",
        }}
      >
        {" "}
        <LabelText>Select School</LabelText>
        <IoSchoolOutline style={{ marginLeft: "15px" }} />
      </div>

      <Input
        style={{ fontSize: "12px" }}
        placeholder={placeholderText}
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
  min-width: 300px;
  position: relative;
  margin: 20px;
`;

const SchoolName = styled.div`
  margin-top: 15px;
  padding: 0;
  margin: 0;
`;

const SchoolLocation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Input = styled.input`
  height: 40px;
  border-radius: 5px;
  padding-left: 5px;
  width: 100%;
  box-shadow: ${ThemeStyles.lightThemeMainBoxShadow};
  border: none;

  &::placeholder {
    font-size: 13px;
    font-weight: 400;
    fontstyle: italic;
    letter-spacing: 0px;
    color: rgb(58, 57, 57);
    margin-left: 10px;
  }
`;

const LabelText = styled.label`
  font-size: 13px;
  position: relative;
  right: 5px;
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
`;

const OptionItem = styled.div`
  height: 45px;
  padding: 3px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 2px -1px;

  &:hover {
    background-color: rgb(0, 245, 245, 0.1);
  }
`;

const LocationInfo = styled.p`
  margin: 0;
`;
