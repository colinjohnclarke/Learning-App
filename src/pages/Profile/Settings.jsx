import React, { useContext, useState } from "react";
import SelectSchool from "../UserPreferencesOnSignup/SelectSchool/SelectSchool";
import SelectYear from "../UserPreferencesOnSignup/SelectYear/SelectYear";
import SoundEffectsToggle from "./SoundEffectsToggle";
import DarkThemeToggle from "./DarkThemeToggle";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { GoPerson } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import MainActionBtn from "../../components/Buttons/MainActionBtn";
import { useUpdatePersonalInformationMutation } from "../../features/api/UserData/updatePersonalInformation";

function Settings() {
  const { darkThemeActive, userData, setUserData } = useContext(UserContext);
  console.log("🚀 ~ Settings ~ userData:", userData);

  const [updatePersonalInformation] = useUpdatePersonalInformationMutation();

  const [school, setSchool] = useState(userData?.user.schoolDetails);
  const [year, setYear] = useState(userData?.user.yearGroup);
  const [firstName, setFirstName] = useState(userData?.user.firstName);
  const [lastName, setLastName] = useState(userData?.user.lastName);

  const { user } = useAuth0();

  let schoolDetails = {
    id: userData?.user._id,
    ...school,
    year,
    firstName,
    lastName,
  };

  const updateSchoolDetails = async () => {
    try {
      const result = await updatePersonalInformation(schoolDetails);

      if (result) {
        console.log("result", result?.data);

        setUserData((prev) => result?.data);
      }

      console.log("🚀 ~ Settings ~ userData:", userData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    updateSchoolDetails();

    console.log("clicked");
  };

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "start",
          width: "100%",

          //   border: "1px solid",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "95%",
            alignItems: "center",
            fontSize: "13px",
            margin: "10px",
            marginLeft: "34px",
          }}
        >
          {/* <Btn darkThemeActive={darkThemeActive}>
            <MdEdit fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"} />
          </Btn> */}
          <MdOutlineEmail
            fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
          />{" "}
          &nbsp;{" "}
          <P darkThemeActive={darkThemeActive} style={{ fontSize: "13px" }}>
            Email:{" "}
          </P>
          &nbsp;{" "}
          <P
            darkThemeActive={darkThemeActive}
            style={{ fontSize: "13px", fontWeight: "600" }}
          >
            {userData?.user.email}
          </P>
        </div>

        {userData?.user._id}
      </div>
      <Row>
        <Name>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              // padding: "10px",
              backgroundColor: darkThemeActive
                ? ThemeStyles.lightThemePrimaryBackgroundColor
                : ThemeStyles.darkThemePrimaryBackgroundColor,
            }}
          >
            {" "}
            <LabelText darkThemeActive={darkThemeActive}> First Name</LabelText>
            <GoPerson
              fill={darkThemeActive ? "black" : "white"}
              style={{
                marginLeft: "15px",
                position: "relative",
                left: "14px",
                bottom: "2px",
              }}
            />
          </div>
          <Input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
            type="text"
            placeholder={firstName}
            darkThemeActive={darkThemeActive}
          ></Input>{" "}
        </Name>

        <Name>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              // padding: "10px",
              backgroundColor: darkThemeActive
                ? ThemeStyles.lightThemePrimaryBackgroundColor
                : ThemeStyles.darkThemePrimaryBackgroundColor,
            }}
          >
            {" "}
            <LabelText darkThemeActive={darkThemeActive}> Last Name</LabelText>
            <GoPerson
              fill={darkThemeActive ? "black" : "white"}
              style={{
                marginLeft: "15px",
                position: "relative",
                left: "14px",
                bottom: "2px",
              }}
            />
          </div>
          <Input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            value={lastName}
            placeholder={userData?.user.lastName}
            darkThemeActive={darkThemeActive}
          ></Input>
        </Name>
        <Year>
          {" "}
          <SelectYear setYear={setYear} />
        </Year>

        <School>
          {" "}
          <SelectSchool setSchool={setSchool} />
        </School>
      </Row>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "90%",
          justifyContent: "start",
          margin: "20px",
        }}
      >
        <Box>
          {" "}
          <SoundEffectsToggle /> <DarkThemeToggle />
        </Box>
      </div>

      <MainActionBtn
        onClick={() => {
          handleClick();
          console.log("clicked");
        }}
        style={{ margin: "50px" }}
        darkThemeActive={darkThemeActive}
      >
        {" "}
        Save Settings
      </MainActionBtn>
    </Wrapper>
  );
}

export default Settings;

const Row = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;

  min-height: 350px;
`;

const P = styled.p`
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 350px;

  @media ${device.tablet} {
  }
`;

const Year = styled.div`
  width: 99.5%;

  @media ${device.mobileL} {
    width: 97%;
  }

  @media ${device.tablet} {
    width: 100%;
  }
`;

const School = styled.div`
  width: 96%;

  @media ${device.mobileL} {
    width: 97%;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

const Name = styled.div`
  width: 96%;
  @media ${device.tablet} {
    width: 99%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 100px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Input = styled.input`
  height: 40px;
  border-radius: 5px;
  padding-left: 5px;
  width: 100%;
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
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
    margin-left: 10px;
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

const Btn = styled.button`
  position: relative;
  left: 4px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.5px lightgrey;
  margin-right: 15px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? `${ThemeStyles.lightThemeMainBoxShadow}, rgba(0, 0, 0, 0.15) 0px 3px 2px 2px`
      : `${ThemeStyles.darkThemeMainBoxShadow}`};

  &:hover {
    background-color: rgb(39, 106, 245, 0.05);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }
`;
