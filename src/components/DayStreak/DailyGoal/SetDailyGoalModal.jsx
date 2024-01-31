import React, { useState } from "react";
import styled from "styled-components";
import { TbTargetArrow } from "react-icons/tb";
import MainActionBtn from "../../Buttons/MainActionBtn";

function SetDailyGoalModal({ modalIsOpen, setModalIsOpen }) {
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleOptionChange = (e) => {
    // setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Selected XP Points:", selectedOption);
    toggleModal();
  };

  return (
    <div>
      {modalIsOpen && (
        <ModalWrapper>
          <ModalContent>
            <ModalTitle>
              Set your Daily Goal
              <TbTargetArrow size={140} />
            </ModalTitle>
            <ModalForm onSubmit={handleSubmit}>
              <ModalOption>
                <Name> Starter</Name> <P> 20 XP</P>{" "}
              </ModalOption>
              <ModalOption>
                <Name> Casual</Name> <P>50 XP</P>{" "}
              </ModalOption>
              <ModalOption>
                <Name> Intermediate</Name> <P>100 XP</P>{" "}
              </ModalOption>
              <ModalOption>
                <Name> Serious</Name> <P>150 XP</P>{" "}
              </ModalOption>
              <ModalOption>
                <Name> Advanced</Name> <P>200 XP</P>{" "}
              </ModalOption>

              <ModalButton type="submit">Set</ModalButton>
            </ModalForm>
          </ModalContent>
        </ModalWrapper>
      )}
    </div>
  );
}

export default SetDailyGoalModal;

const ModalWrapper = styled.div`
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

const P = styled.p``;

const Name = styled.div``;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalButton = styled.button`
  background-color: #333;
  color: #fff;
  padding: 8px 16px;
  width: 300px;
  height: 50px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalOption = styled.div`
  height: 40px;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 7px;
  padding: 4px;
  min-height: 50px;
  border: 0.5px solid lightgrey;
  // min-width: 350px;
  // max-width: 350px;
  border-radius: 5px;

  &:hover {
    transition: 0s;
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;
  }
`;
