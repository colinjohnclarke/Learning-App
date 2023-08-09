import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AllTimeLearningTimeBox from "./Scores/AllTimeLearningTimeBox";
import AllTimeQuestionsAnsweredBox from "./Scores/AllTimeQuestionsAnsweredBox";
import AllTimeXPBox from "./Scores/AllTimeXPBox";
import DashboardHeader from "./DashboardHeader";
import RecentCourse from "./RecentCourse";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import SearchCourse from "../../components/Search/SearchCourse";
import "animate.css";
import { device } from "../../styles/breakpoints";

function Dashboard() {
  const [val, setVal] = useState(0);

  const [animateClass, setAnimateClass] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setVal((val) => val + 1);

      if (val % 2 === 0) {
        setAnimateClass((val) => " animate__animated animate__swing  ");
      } else if (val % 2 !== 0) {
        setAnimateClass((val) => "animate__animated animate__wobble");
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [val]);

  return (
    <Wrapper>
      <DashboardHeader />
      <Main>
        <Greeting>
          <Welcome>
            Welcome Colin!
            <img
              className={animateClass}
              style={{
                height: "30px",
                width: "30px",
                paddingLeft: "10px",
                objectFit: "fill",
              }}
              alt="djskjk"
              src="https://cdn.shopify.com/s/files/1/1061/1924/files/Hugging_Face_Emoji_2028ce8b-c213-4d45-94aa-21e1a0842b4d_large.png?15202324258887420558"
            ></img>
          </Welcome>
        </Greeting>

        {/* display user data */}

        <UserdataWrapper>
          <Box>
            <AllTimeLearningTimeBox />
          </Box>
          <Box>
            <AllTimeQuestionsAnsweredBox />
          </Box>
          <Box>
            <AllTimeXPBox />
          </Box>{" "}
        </UserdataWrapper>

        <SearchCourse />

        {/* display recent Courses */}
        <Course>
          <RecentCourse />
        </Course>

        <LeaderBoard></LeaderBoard>
      </Main>
    </Wrapper>
  );
}

export default Dashboard;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.div`
  height: 100%;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Greeting = styled.div`
  padding-top: 30px;
  height: 80px;
  width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Welcome = styled.h1`
  font-size: 20px;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const UserdataWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  // max-width: 500px;

  // @media ${device.tablet} {
  //   width: 50%;
  //   transition: 0s;
  // }
`;

const Box = styled.div`
  height: 100%;
  width: 33.3%;
  margin: 3px;
  // padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
`;

const Course = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // margin: 7px;
`;
