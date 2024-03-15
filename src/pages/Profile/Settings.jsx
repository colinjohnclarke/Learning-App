import React, { useContext, useState, useEffect } from "react";
import SelectSchool from "../GatherUserDataOnsignup/SelectSchool/SelectSchool";
import SelectYear from "../GatherUserDataOnsignup/SelectYear/SelectYear";
import SoundEffectsToggle from "./SoundEffectsToggle";
import DarkThemeToggle from "./DarkThemeToggle";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { GoPerson } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import MainActionBtn from "../../components/Buttons/MainActionBtn";
import { useUpdatePersonalInformationMutation } from "../../redux/api/UserData/updatePersonalInformation";
import InputField from "../GatherUserDataOnsignup/UserNames/InputField";
import ConfirmChangeofPersonalDataModal from "./ConfirmChangeofPersonalDataModal";

function Settings() {
  const { darkThemeActive, userData, setUserData } = useContext(UserContext);

  const [updatePersonalInformation] = useUpdatePersonalInformationMutation();

  const [school, setSchool] = useState(null);
  const [year, setYear] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [newFirstNameEntered, setNewFirstNameEntered] = useState(false);
  const [newLastNameEntered, setNewLastNameEntered] = useState(false);

  useEffect(() => {
    if (userData.user) {
      setSchool(userData.user.schoolDetails);
      setYear(userData.user.yearGroup);
      setFirstName(userData.user.firstName);
      setLastName(userData.user.lastName);
    }
  }, [userData]);

  let schoolDetails = {
    id: userData?.user._id,
    schoolName: school?.name,
    schoolTown: school?.town,
    schoolLa: school?.la || "",
    schoolPostCode: school?.postcode,
    year,
    firstName,
    lastName,
  };

  const updateSchoolDetails = async () => {
    try {
      const result = await updatePersonalInformation(schoolDetails);

      if (result) {
        setUserData((prev) => result?.data);
      }
    } catch (error) {}
  };

  const confirmUpdateDetails = () => {
    updateSchoolDetails();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = () => {
    confirmUpdateDetails();
    setIsModalOpen(false);
  };

  const nameIcon = (
    <GoPerson
      fill={darkThemeActive ? "black" : "white"}
      style={{
        marginLeft: "15px",
        position: "relative",
        left: "14px",
        bottom: "2px",
      }}
    />
  );

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      {isModalOpen && (
        <ConfirmChangeofPersonalDataModal
          confirmUpdateDetails={confirmUpdateDetails}
          isOpen={isModalOpen}
          onCancel={handleCloseModal}
          onConfirm={handleConfirmModal}
        />
      )}
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
          <Btn darkThemeActive={darkThemeActive}>
            <MdEdit fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"} />
          </Btn>
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
      </div>
      <Row>
        <Selection>
          <InputField
            setNewOptionSelected={setNewFirstNameEntered}
            icon={nameIcon}
            text={"First Name"}
            placeholder={firstName}
            setStateFN={setFirstName}
          ></InputField>
        </Selection>

        <Selection>
          <InputField
            setNewOptionSelected={setNewLastNameEntered}
            icon={nameIcon}
            text={"Last Name"}
            placeholder={lastName}
            setStateFN={setLastName}
          ></InputField>
        </Selection>

        <Selection>
          <SelectSchool setSchool={setSchool} school={school} />
        </Selection>

        <Selection style={{ width: "101%" }}>
          <SelectYear setYear={setYear} />
        </Selection>
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
          handleOpenModal();
        }}
        style={{ margin: "50px", width: "250px" }}
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

const Selection = styled.div`
  width: 100%;

  @media ${device.mobileL} {
  }

  @media ${device.tablet} {
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
