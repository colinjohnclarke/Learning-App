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

function App() {
  const [sliderquestioncorrectnumber, setSliderQuestionCorrectNumber] =
    useState(0);

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

      {/* <Reftest /> */}
    </div>
  );
}

export default App;
