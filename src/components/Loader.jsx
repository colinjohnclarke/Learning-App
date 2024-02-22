import React, {useContext} from 'react'
import styled from 'styled-components'
import GridLoader from "react-spinners/GridLoader";
import { UserContext } from '../App';
import { ThemeStyles } from '../styles/ThemeStyles';


function Loader() {

    const darkThemeActive = useContext(UserContext)
  return (
    <Wrapper darkThemeActive={darkThemeActive} >
    <GridLoader
      color={"rgb(0, 250, 250)"}
      size={25}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    
   
  </Wrapper>
  )
}

export default Loader


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
    background-color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryBackgroundColor
        : ThemeStyles.darkThemePrimaryBackgroundColor}; 

`;
