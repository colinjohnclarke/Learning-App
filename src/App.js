import Testingapi from "./features/testapi/Testingapi";
import SubjectsList from "./features/testpage/SubjectsList";
import SkillsList from "./features/testpage/SkillsList";
import Block from "./features/testpage/Block";
import TestText from "./features/testpage/TestText";
import TestSanity from "./features/testpage/TestSanity";
import TextandImage from "./features/testpage/TextandImage";
import Biology from "./features/testpage/Biology";
import StudentInput from "./components/SingleStudentInput/StudentInputForm";
import Test2 from "./components/Test2";
import GetData from "./components/SingleStudentInput/GetData";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

function App() {
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
    // <ThemeProvider theme={theme}>

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
    </div>
    // </ThemeProvider>
  );
}

export default App;
