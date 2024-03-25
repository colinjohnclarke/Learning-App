import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { UserContext } from "../../../App";
import { device } from "../../../styles/breakpoints";
import { GoPerson } from "react-icons/go";
import InputField from "./InputField";
import { useUpdateUserNamesMutation } from "../../../redux/api/UserData/updateUserNames";
import MainActionBtn from "../../../components/Buttons/MainActionBtn";
import { FcReading } from "react-icons/fc";

function ConfirmUserFirstName({ navigateSignup }) {
  const { darkThemeActive, userData } = useContext(UserContext);

  const [updateUserNames] = useUpdateUserNamesMutation();

  const [lastName, setLastName] = useState(
    userData?.user.lastName || " type last name..."
  );

  const [firstName, setFirstName] = useState(
    userData?.user.firstName || " type first name..."
  );

  const {
    displayConfirmUserNames,
    setDisplayConfirmUserNames,
    displayStudentAndSchoolWrapper,
    setDisplayStudentAndSchoolWrapper,
    displayCustomiseUserExperience,
    setDisplayCustomiseUserExperience,
  } = navigateSignup;

  const saveUserNames = async () => {
    await updateUserNames({
      id: userData?.user._id,
      lastName: lastName,
      firstName: firstName,
    });
  };

  const handleSaveBtnClicked = (e) => {
    e.preventDefault();
    saveUserNames();
    setDisplayStudentAndSchoolWrapper(true);
    setDisplayConfirmUserNames(false);
  };

  const firstNameIcon = (
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
    <ModalContent>
      <h2> Personal details </h2>
      <FcReading size={50} stroke={darkThemeActive ? "" : "white"} />
      <InputField
        placeholder={firstName}
        icon={firstNameIcon}
        text={"First name"}
        setStateFN={setFirstName}
      />
      <InputField
        placeholder={lastName}
        icon={firstNameIcon}
        text={"Last name"}
        setStateFN={setLastName}
      />

      <MainActionBtn
        style={{ width: "300px" }}
        darkThemeActive={darkThemeActive}
        onClick={handleSaveBtnClicked}
      >
        {" "}
        Save
      </MainActionBtn>
    </ModalContent>
  );
}

export default ConfirmUserFirstName;

const ModalContent = styled.div`
  height: 450px;
  width: 60%;
  max-width: 500px;
  position: relative;
  background-color: #fff;
  padding: 60px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  p,
  h2 {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  @media ${device.tablet} {
    width: 300px;
  }
`;
