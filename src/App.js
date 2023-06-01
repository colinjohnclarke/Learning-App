import { useState } from "react";

import "./App.css";
import SubjectsList from "./features/testpage/SubjectsList";
import SkillsList from "./features/testpage/SkillsList";
import Block from "./features/testpage/Block";
import TestText from "./features/testpage/TestText";
import TestSanity from "./features/testpage/TestSanity";
import TextandImage from "./features/testpage/TextandImage";
import Biology from "./features/testpage/Biology";

import { SliderSelectionIsCorrectContext } from "./components/SliderSelection/SliderTextbox";

import ClickIncorrectWord from "./components/ClickIncorrectWord/ClickIncorrectWord";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

function App() {
  
  const [sliderquestioncorrectnumber, setSliderQuestionCorrectNumber] =
    useState(0);

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#3630c4",
  //     },
  //   },
  //   typography: {
  //     fontFamily: "Didact Gothic",
  //   },
  // });

  return (
    <div>
      {/* <Testingapi />
      <SubjectsList /> */}
      {/* <SkillsList />
      <Block />
      
      <TestSanity /> */}

      {/* <TestText /> */}
      {/* <TextandImage /> */}

      <SliderSelectionIsCorrectContext.Provider
        value={{ sliderquestioncorrectnumber, setSliderQuestionCorrectNumber }}
      >
        <Biology />
      </SliderSelectionIsCorrectContext.Provider>

      {/* <StudentInput /> */}

      {/* <ClickIncorrectWord /> */}
    </div>
  );
}

export default App;
