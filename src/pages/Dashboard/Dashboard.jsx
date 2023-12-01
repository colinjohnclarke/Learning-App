import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AllTimeLearningTimeBox from "./Scores/AllTimeLearningTimeBox";
import AllTimeQuestionsAnsweredBox from "./Scores/AllTimeQuestionsAnsweredBox";
import AllTimeXPBox from "./Scores/AllTimeXPBox";
import DashboardHeader from "./DashboardHeader";
import Courses from "./Courses";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import SearchCourse from "../../components/Search/SearchCourse";
import "animate.css";
import { device } from "../../styles/breakpoints";
import { useAuth0 } from "@auth0/auth0-react";
import sanityClient from "../../createclient";

import { useGetUserByEmailQuery } from "../../features/api/UserData/userDataSlice";

function Dashboard() {
  const [queryResult, setQueryResult] = useState({});
  const { user } = useAuth0();
  // console.log("🚀 ~ file: Dashboard.jsx:20 ~ Dashboard ~ user:", user);


  

  const { data, isLoading, isError, error } = useGetUserByEmailQuery(
    user?.email
  );

  return (
    <Wrapper>
      <DashboardHeader />
      <Main>
        <Greeting>
          <Welcome>
            <h3>Welcome back, {user.given_name}</h3>
            <img
              referrerpolicy="no-referrer"
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "20px",
                objectFit: "fill",
                margin: "10px",
                border: "2px solid",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              }}
              alt="User Avatar"
              src={
                user.picture
                  ? user.picture
                  : "https://gravatar.com/avatar/0eba654f044a6227afcc0c943db3bbe1?s=400&d=robohash&r=x"
              }
            />
          </Welcome>
        </Greeting>
        {/* display user data */}
        <UserdataWrapper>
          <Box>
            <AllTimeLearningTimeBox data={data} />
          </Box>
          <Box>
            <AllTimeQuestionsAnsweredBox data={data} />
          </Box>
          <Box>
            <AllTimeXPBox data={data} />
          </Box>
        </UserdataWrapper>
        <SearchCourse />
        {/* display recent Courses */}
        <Course>
          <Courses data={data} />
        </Course>
        <LeaderBoard />
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
  padding-top: 40px;
  height: 100px;
  width: 350px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Welcome = styled.div`
  font-size: 20px;
  width: 100%;
  height: 10vh;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

const UserdataWrapper = styled.div`
  width: 98.7%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  // max-width: 500px;

  // @media ${device.tablet} {
  //   width: 50%;
  //   transition: 0s;
  // }
`;

const Box = styled.div`
  height: 100%;
  width: 100%;
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
  width: 98%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // margin: 7px;
`;
