import React, { useContext } from "react";
import { UserContext } from "../../App";
import styled from "styled-components";
import AllTimeLearningTimeBox from "./Scores/AllTimeLearningTimeBox";
import AllTimeQuestionsAnsweredBox from "./Scores/AllTimeQuestionsAnsweredBox";
import AllTimeXPBox from "./Scores/AllTimeXPBox";
import DashboardHeader from "./DashboardHeader";
import CoursesDashBoard from "./CoursesDashBoard";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import SearchCourse from "../../components/Search/SearchCourse";
import "animate.css";
import { device } from "../../styles/breakpoints";
import { useAuth0 } from "@auth0/auth0-react";
import sanityClient from "../../createclient";
import GridLoader from "react-spinners/GridLoader";
import Weekday from "../../components/Weekday";
import { useGetAllEnrolledCoursesDataQuery } from "../../features/api/UserData/enrolledCourseDataSlice";

import { useGetUserByEmailQuery } from "../../features/api/UserData/userDataSlice";

function Dashboard() {
  const { user } = useAuth0();
  const userData = useContext(UserContext);
  console.log(
    "🚀 ~ file: Dashboard.jsx:24 ~ Dashboard ~ userData TEST@!!!:",
    userData
  );



  // const { data, isLoading, isError, error } = useGetUserByEmailQuery(
  //   user?.email
  // );

  const loader = (
    <Loader>
      <GridLoader
        color={"rgb(0, 250, 250, 0.5)"}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Loader>
  );

  return (
    <Wrapper>
      <DashboardHeader />
      <Padding>
        {/* {!data && loader} */}

        <Main>
          <Greeting>
            <Welcome>
              <h3 style={{ color: "white" }}>
                Welcome {userData?.user.firstName}!
              </h3>
              <img
                referrerpolicy="no-referrer"
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "20px",
                  objectFit: "fill",
                  margin: "10px",
                  // border: "2px solid",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                }}
                alt="User Avatar"
                src={
                  user.picture ||
                  "https://gravatar.com/avatar/0eba654f044a6227afcc0c943db3bbe1?s=400&d=robohash&r=x"
                }
              />
            </Welcome>
            <Weekday />
          </Greeting>

          {/* display user data */}
          <UserdataWrapper>
            <Box style={{ marginRight: "5px" }}>
              <AllTimeLearningTimeBox data={userData?.user.totalTimeElapsed} />
            </Box>
            <Box style={{ margin: "5px 5px" }}>
              <AllTimeQuestionsAnsweredBox
                data={userData?.user.totalQuestionsAttempted}
              />
            </Box>
            <Box style={{ marginLeft: "5px" }}>
              <AllTimeXPBox data={userData?.user.totalXP} />
            </Box>
          </UserdataWrapper>
          <div style={{ height: "5px" }}></div>
          <SearchCourse />
          <div style={{ height: "5px" }}></div>
          {/* display recent Courses */}

          <CoursesDashBoard  />

          <div style={{ height: "10px" }}></div>
          <LeaderBoard />
        </Main>
      </Padding>
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

const Padding = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.desktop} {
    width: 100%;
  }
`;
const Main = styled.div`
  height: 100%;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  // padding: 10px;
  @media ${device.tablet} {
    margin-top: 60px;
  }
`;

const Greeting = styled.div`
  height: 180px;
  width: 100%;
  margin-top: 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    225deg,
    rgba(0, 200, 200, 0.4) 0%,
    rgba(0, 200, 200, 0.7) 20%,
    rgba(0, 200, 200, 1) 60%,
    rgba(39, 106, 245, 0.7) 100%
  );
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);

  @media ${device.tablet} {
    height: 20vh;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  border-radius: 4px;
`;

const Welcome = styled.div`
  font-size: 20px;
  width: 100%;
  height: 3vh;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

const UserdataWrapper = styled.div`
  // padding-top: 10px;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;

  // max-width: 500px;

  @media ${device.tablet} {
    // width: 50%;
    // transition: 0s;
  }
`;

const Box = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
`;

// const Course = styled.div`
//   width: 98%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   // margin: 7px;
// `;

const Loader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
  background-color: rgba(239, 239, 249);
`;
