import React, { useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { device } from "../../styles/breakpoints";
import { allCoursesList } from "../../pages/Dashboard/AllCoursesList";
import CourseSearchResult from "../../pages/Dashboard/CourseSearchResult";
import { Link } from "react-router-dom";

function SearchCourse() {
  const [searchedResult, setSearchedResult] = useState({});
  const [displaySearchResults, setDisplaySearchResult] = useState(false);

  const searchCourse = (val) => {
    let result = allCoursesList.filter(
      (course) =>
        course.subject.toLowerCase().includes(val) ||
        course.blockName.toLowerCase().includes(val) ||
        course.courseName.toLowerCase().includes(val)
    );

    setSearchedResult((res) => result);
  };

  let searchBoxHeight = searchedResult.length * 60 + 60;

  console.log("searchedResult", searchedResult);
  return (
    <Outer
      style={{
        height: displaySearchResults ? `${searchBoxHeight}px` : "60px",
      }}
    >
      <Main>
        <Wrapper>
          <div>
            <BsSearch />
          </div>
          <Input
            onChange={(e) => {
              searchCourse(e.target.value.toLowerCase());
              if (e.target.value) {
                setDisplaySearchResult((val) => true);
              } else {
                setDisplaySearchResult((val) => false);
                setSearchedResult({});
              }
            }}
            type="text"
            placeholder="Search our courses..."
          ></Input>

          {!searchedResult.length && displaySearchResults && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                // alignItems: "start",
                height: "60px",
              }}
            >
              <div>
                <p
                  style={{
                    height: "60px",
                    width: "150px",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  Sorry... no search result can i suggest
                </p>
              </div>

              <SuggestedCourse>
                <Link
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    width: "100%",
                    textDecoration: "none",
                  }}
                  to={"/courses/biology"}
                >
                  <Box
                    style={{
                      width: "50%",
                      height: "90%",
                      backgroundColor: "white",
                      // border: "1px solid",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        backgroundColor: "white",
                      }}
                    >
                      {allCoursesList[Math.floor(Math.random() * 10)].blockName}{" "}
                      :
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      {
                        allCoursesList[Math.floor(Math.random() * 10)]
                          .courseName
                      }
                    </p>
                  </Box>
                </Link>
              </SuggestedCourse>
            </div>
          )}
        </Wrapper>

        {displaySearchResults && <CourseSearchResult data={searchedResult} />}
      </Main>
    </Outer>
  );
}

export default SearchCourse;

const Wrapper = styled.form`
  height: 30px;
  width: 94.5%;
  // max-width: 880px;
  background-color: white;
  border-radius: 5px;
  margin: 6px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  // justify-content: ;
  align-items: center;
  font-size: 12px;
  transition: all 0.2s ease;
`;

const Input = styled.input`
  height: 40px;
  width: 50%;
  border: none;
  outline: none;
  padding-left: 10px;
  transition: all 0.2s ease;
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  transition: all 0.2s ease;
`;

const Box = styled.a`
  height: 60px;

  min-width: 300px;
  margin: 2px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: rgb(255, 255, 255);
  transition: 0.4s;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 0.3);
    transition: 0.4s;
  }
`;

const SuggestedCourse = styled.div`
  display: none;

  @media ${device.mobileL} {
    display: flex;
  }
`;

const Outer = styled.div`
  width: 97%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;

  //
`;

const SuggestCourseMobile = styled.div`
  display: flex;

  @media ${device.mobileL} {
    display: none;
  }
`;
