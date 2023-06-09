import { useState } from "react";

import "./App.css";
import SubjectsList from "./pages/SubjectsList";
import SkillsList from "./pages/SkillsList";
import Block from "./pages/Block";
import TestText from "./pages/TestText";
import TestSanity from "./pages/TestSanity";
import TextandImage from "./pages/TextandImage";
import Biology from "./pages/Biology";

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

      <Biology />

      {/* <StudentInput /> */}

      {/* <ClickIncorrectWord /> */}
    </div>
  );
}

export default App;
