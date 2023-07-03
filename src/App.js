import { useState, useEffect } from "react";
import "./App.css";
import SubjectsList from "./pages/SubjectsList";
import SkillsList from "./pages/SkillsList";
import Block from "./pages/Block";
import TestText from "./pages/TestText";
import TestSanity from "./pages/TestSanity";
import TextandImage from "./pages/TextandImage";
import Biology from "./pages/Biology";
import Maths from "./pages/Maths";

import ClickIncorrectWord from "./components/ClickIncorrectWord/ClickIncorrectWord";

// import BarChart from "./components/Charts/BarChart";

// import { UserData } from "./components/Charts/Data";
// import LineChart from "./components/Charts/LineChart";

function App() {
  // const [userdata, setUserData] = useState({
  //   labels: UserData.map((data) => {
  //     return data.year;
  //   }),
  //   datasets: [
  //     {
  //       label: "Users Gained",
  //       data: UserData.map((data) => {
  //         return data.userLost;
  //       }),
  //       backgroundColor: ["red", "blue", "green", "yellow"],
  //       shadowOffsetX: 3,
  //       shadowOffsetY: 3,
  //       shadowBlur: 10,
  //       shadowColor: "rgba(0, 0, 0, 0.5)",
  //       pointBevelWidth: 3,
  //       pointBevelHighlightColor: "rgba(255, 255, 255, 0.75)",
  //       pointBevelShadowColor: "rgba(0, 0, 0, 0.5)",
  //       pointShadowOffsetX: 3,
  //       pointShadowOffsetY: 3,
  //       pointShadowBlur: 10,
  //       pointShadowColor: "rgba(0, 0, 0, 0.5)",
  //       pointHoverInnerGlowWidth: 20,
  //       pointHoverInnerGlowColor: "rgba(255, 255, 0, 0.5)",
  //       pointHoverOuterGlowWidth: 20,
  //       pointHoverOuterGlowColor: "rgba(255, 255, 0, 1)",
  //       backgroundOverlayMode: "multiply",
  //     },
  //   ],
  // });

  // const options = {
  //   tooltips: {
  //     bevelWidth: 3,
  //     bevelHighlightColor: "rgba(255, 255, 255, 0.75)",
  //     bevelShadowColor: "rgba(0, 0, 0, 0.5)",
  //     shadowOffsetX: 3,
  //     shadowOffsetY: 3,
  //     shadowBlur: 10,
  //     shadowColor: "rgba(0, 0, 0, 0.5)",
  //   },
  // };

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
      {/* <Maths /> */}
      {/* <Graph /> */}
      {/* <StudentInput /> */}
      {/* <ClickIncorrectWord /> */}
      {/* <Reftest /> */}
      {/* <div style={{ width: "500px" }}>
        <BarChart chartData={userdata}></BarChart>
      </div> */}
    </div>
  );
}

export default App;
