import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TbTargetArrow } from "react-icons/tb";
import { UserContext } from "../../../App";
import {
  darkThemeSecondaryBackgroundColor,
  ThemeStyles,
} from "../../../styles/ThemeStyles";
import ConfettiDashboard from "../../AnimatedEffects/ConfettiDashboard";
import { device } from "../../../styles/breakpoints";
import { DiRubyRough } from "react-icons/di";
import { useUpdateDailyXpGoalMutation } from "../../../redux/api/UserData/dailyXPGoal";
import { IoMdClose } from "react-icons/io";

function SetDailyGoal({ modalIsOpen, setModalIsOpen }) {
  const { darkThemeActive, userData, setUserData } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState();

  const [displayDailyGoalUpdate, setDisplayDailyGoalUpdate] = useState(false);

  const [updateDailyXpGoal, isLoading, isError, error, data] =
    useUpdateDailyXpGoalMutation();

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleSubmit = async () => {
    setDisplayDailyGoalUpdate((val) => true);
    const updatedDailyXPGoal = {
      id: userData?.user._id,
      XPGoal: selectedOption,
    };

    const updatedUser = await updateDailyXpGoal(updatedDailyXPGoal);

    if (updatedUser) {
      setUserData((prev) => updatedUser.data);
    }
  };

  const selected = {
    backgroundColor: darkThemeActive
      ? "lightgrey"
      : darkThemeSecondaryBackgroundColor,
    color: "white",
  };

  const inActiveSubmitButtonStyle = {
    backgroundColor: "rgb(0, 245, 245, 0.2)",
    color: darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor,

    boxShadow: darkThemeActive
      ? ThemeStyles.darkThemeMainBoxShadow
      : ThemeStyles.lightThemeMainBoxShadow,
  };

  const activeSubmitButtonStyle = {
    backgroundColor: darkThemeActive
      ? "rgb(0, 245, 245)"
      : ThemeStyles.darkThemePrimaryBackgroundColor,

    color: darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor,

    boxShadow: darkThemeActive
      ? ThemeStyles.darkThemeMainBoxShadow
      : ThemeStyles.lightThemeMainBoxShadow,

    border: "2px solid rgba(0, 240, 240, 0.8)",
    color: "white",
  };

  const XPPointsOptions = [
    { name: "Light", xp: "100" },
    { name: "Casual", xp: "150" },
    { name: "Intermediate", xp: "200" },
    { name: "Serious", xp: "250" },
    { name: "Advanced", xp: "500" },
  ];

  //   else if (isLoading) {
  //     setDailyGoalApiResponseContent = (
  //       <GridLoader
  //         color={"rgb(0, 250, 250, 0.5)"}
  //         size={25}
  //         aria-label="Loading Spinner"
  //         data-testid="loader"
  //       />
  //     );
  //   }
  //   else if (isError) {
  //     // Handle error state
  //     console.log(error);
  //     <ModalContent>
  //       {" "}
  //       <ErrorContainer>
  //         <ErrorMessage>An error occurred: {error.message}</ErrorMessage>
  //       </ErrorContainer>
  //     </ModalContent>;
  //   }

  const options = XPPointsOptions.map((option, optionsIndex) => {
    let rubys = XPPointsOptions.map((item, index) => {
      if (index <= optionsIndex) {
        return <DiRubyRough size={15} fill="rgb(138,43,226)" />;
      } else return <></>;
    });

    return (
      <ModalOption
        style={selectedOption === option.xp ? selected : {}}
        type="button"
        value={option.xp}
        onClick={(e) => {
          e.preventDefault();
          setSelectedOption(option.xp);
        }}
        darkThemeActive={darkThemeActive}
      >
        <Name darkThemeActive={darkThemeActive}> {option.name}</Name>
        <Ruby>{rubys}</Ruby>
        <P darkThemeActive={darkThemeActive}>{option.xp} XP</P>
      </ModalOption>
    );
  });

  return (
    <Wrapper>
      {!displayDailyGoalUpdate ? (
        <ModalContent darkThemeActive={darkThemeActive}>
          <ModalExitBtn darkThemeActive={darkThemeActive} onClick={toggleModal}>
            {" "}
            <IoMdClose
              fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
              size={24}
            />
          </ModalExitBtn>
          <ModalTitle darkThemeActive={darkThemeActive}>
            Set your Daily Goal
            <TbTargetArrow
              style={{ marginTop: "10px" }}
              stroke={
                darkThemeActive
                  ? ThemeStyles.darkThemeTertiaryBackgroundColor
                  : "white"
              }
              size={140}
            />
          </ModalTitle>
          <ModalForm onSubmit={handleSubmit}>
            {options}

            <ModalButton
              onClick={handleSubmit}
              style={
                !selectedOption
                  ? inActiveSubmitButtonStyle
                  : activeSubmitButtonStyle
              }
              disabled={!selectedOption}
              type="button"
            >
              Lock it in!
            </ModalButton>
          </ModalForm>
        </ModalContent>
      ) : (
        <ModalContent darkThemeActive={darkThemeActive}>
          <ModalExitBtn onClick={toggleModal}>
            {" "}
            <IoMdClose
              fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
              size={24}
            />
          </ModalExitBtn>
          <ConfettiDashboard></ConfettiDashboard>
          <ModalTitle darkThemeActive={darkThemeActive}>
            Daily Goal set to {selectedOption} XP .
            <div style={{ height: "20px" }}></div>
            <TbTargetArrow
              stroke={
                darkThemeActive
                  ? ThemeStyles.darkThemeTertiaryBackgroundColor
                  : "white"
              }
              size={140}
            />
          </ModalTitle>

          <ModalButton
            darkThemeActive={darkThemeActive}
            onClick={toggleModal}
            style={
              !selectedOption
                ? inActiveSubmitButtonStyle
                : { border: "2px solid white" }
            }
            disabled={!selectedOption}
            type="button"
          >
            Continue!
          </ModalButton>
        </ModalContent>
      )}
    </Wrapper>
  );
}

export default SetDailyGoal;

const Wrapper = styled.div`
  position: absolute;
  z-index: 300;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const P = styled.p`
  padding-right: 10px;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const Name = styled.div`
  padding-left: 10px;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 60vw;
  position: relative;
  background-color: #fff;
  padding: 60px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  @media ${device.tablet} {
    width: auto;
  }
`;

const Ruby = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ModalExitBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.5px lightgrey;
  margin: 3px;
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

const ModalButton = styled.button`
  margin: 7px;
  padding: 4px;
  height: 50px;
  width: 300px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 240, 240, 1);
    color: white;
  }

  &:active {
    transform: translateY(3px);
    background-color: rgba(0, 240, 240, 1);
    box-shadow: none;
  }
`;

const ModalTitle = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const ModalOption = styled.button`
  height: 40px;
  min-width: 300px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 7px;
  padding: 4px;
  min-height: 50px;
  border-radius: 5px;
  border: none;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  &:hover {
    transition: 0s;
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const ErrorMessage = styled.p`
  font-size: 24px;
  color: red;
  margin-bottom: 16px;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
