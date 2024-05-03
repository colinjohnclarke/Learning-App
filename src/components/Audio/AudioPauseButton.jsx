import { useContext } from "react";
import { FaPause } from "react-icons/fa";
import styled from "styled-components";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";


function AudioPauseButton({ pauseAudio }) {
  const { darkThemeActive } = useContext(UserContext);

  return (
    <Wrapper onClick={pauseAudio} darkThemeActive={darkThemeActive}>
      <FaPause
        darkThemeActive={darkThemeActive}
        size={15}
        fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
      />
    </Wrapper>
  );
}

export default AudioPauseButton;

const Wrapper = styled.button`
  height: 35px;
  width: 35px;
  margin: 10px;
  position: relative;
  z-index: 300;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? `${ThemeStyles.lightThemeMainBoxShadow}, rgba(0, 0, 0, 0.15) 0px 3px 2px 2px`
      : `${ThemeStyles.darkThemeMainBoxShadow}`};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  &:hover {
    background-color: rgb(39, 106, 245, 0.05);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }
`;
