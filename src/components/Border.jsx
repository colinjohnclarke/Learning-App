import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../App";
import { ThemeStyles } from "../styles/ThemeStyles";

function Border({ style, children }) {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <BorderWrapper style={style} darkThemeActive={darkThemeActive}>
      {children}
    </BorderWrapper>
  );
}

export default Border;

const BorderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  padding: 1px;

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  background: ${(props) =>
    props.darkThemeActive
      ? ""
      : "linear-gradient(40deg, transparent, rgba(191, 191, 191, 0.4), 30%, transparent) 40%"};
`;
