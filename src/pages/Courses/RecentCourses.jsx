import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import AnimatedPercentageScore from "../Dashboard/AnimatedPercentageScore";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
import { defaultCoursesImages } from "../Dashboard/CourseFilter/DefaultCourseImages";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import Header from "../../components/Header/Header";
import exam from "../../assets/images/exam.png";
import { useGetAllEnrolledCoursesDataQuery } from "../../features/api/UserData/enrolledCourseDataSlice";
import { useAuth0 } from "@auth0/auth0-react";

function RecentCourses() {
  const courses = FetchCoursefromSanity();
  const builder = imageUrlBuilder(sanityClient);
  const { userData } = useContext(UserContext);
  const { data } = useGetAllEnrolledCoursesDataQuery(userData?.user._id);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const list = data?.enrolledCourses?.map((item, index) => {
    const result = courses.find((subItem) => {
      return subItem.courseName === item.courseName;
    });

    const content = result?.coverImage ? (
      <img
        alt=""
        style={{
          height: "100px",
          width: "100px",
        }}
        src={imgurlFor(result.coverImage.asset._ref)}
      />
    ) : null;

    return (
      <LinkWrapper
        className="animate__animated animate__fadeIn"
        style={{
          textDecoration: "none",
          animationDelay: `${index / 20}s`,
        }}
      >
        <Link
          style={{
            textDecoration: "none",
          }}
          to={`/courses/${item.Subject}/${item.courseName}`}
        >
          <Box>
            <Text>
              {" "}
              <div
                style={{
                  padding: "12px",
                }}
              >
                {" "}
                <p
                  style={{
                    fontSize: "13px",
                    listStyle: "none",
                    // paddingLeft: "10px",
                    fontWeight: "600",
                  }}
                >
                  {item.Subject}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    listStyle: "none",
                    // padding: "12px",
                  }}
                >
                  {item.courseName}
                </p>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  listStyle: "none",
                  padding: "12px",
                }}
              >
                {item.XPForCurrentCourse} Xp Scored
              </p>
            </Text>
            <AnimatedPercentageScore
              color="rgb(39, 106, 245, 1)"
              percentage={item.percentageProgress}
            />

            {content ? (
              <Image>{content}</Image>
            ) : (
              <Img
                src={
                  "https://stpauls.fra1.digitaloceanspaces.com/wp-content/uploads/2022/04/28130914/SPS-logo-centred-POS.png"
                }
              ></Img>
            )}
          </Box>
        </Link>
      </LinkWrapper>
    );
  });

  return (
    <Main
      style={{
        marginTop: "5px",
        // margin: "10px",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "space-around",
        // backgroundColor: "white",
        alignItems: "center",
        fontWeight: "500",
        // height: "300px",
        width: "100%",

        // marginTop: "70px",
        borderRadius: "5px",
        // boxShadow: "0px 0px 30px 4px rgba(174, 196, 216, 0.25)",
      }}
    >
      <PaddingBox />
      <HeaderContent>
        <h2
          style={{
            fontWeight: "500",
            fontSize: "1rem",
            color: "white",
            margin: "30px",
          }}
        >
          Your recent Courses
        </h2>
      </HeaderContent>
      <Grid> {list}</Grid>
      <PaddingBox />
    </Main>
  );
}

export default RecentCourses;

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media ${device.tablet} {
  }
`;

const Grid = styled.div`
  padding-top: 10px;
  width: 100%;
  //   display: flex;
  //   align-items: center;
  //   flex-direction: column;
  //   justify-content: center;

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const LinkWrapper = styled.div`
  width: 100%;
  padding-top: 10px;
`;

const Box = styled.a`
  height: 80px;
  width: 100%;
  min-width: 290px;
  // padding: 4px;
  margin-top: 3px;
  margin-bottom: 3px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: rgb(255, 255, 255);
  transition: 0s;
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);

  &:hover {
    transition: 0s;
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;
    // background-color: rgb(39, 106, 245, 0.01);
  }
`;

const Text = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Img = styled.img`
  height: 100%;
  width: 33.3%;
  border-radius: 5px;
  max-width: 100px;
  min-width: 100px;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
`;

const Image = styled.div`
  height: 100%;
  border-radius: 5px;

  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);

  @media ${device.mobileL} {
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  transition: 0.3s;
  //   background: linear-gradient(
  //     225deg,
  //     rgba(0, 200, 211, 0.2) 0%,
  //     rgba(0, 200, 200, 0.7) 20%,
  //     rgba(0, 200, 200, 1) 50%,
  //     rgba(148, 0, 200, 0.6) 100%
  //   );

  background-image: linear-gradient(
    -225deg,
    rgb(142, 45, 226, 0.5) 0%,
    rgb(74, 0, 224, 0.5) 20%,
    rgb(74, 0, 224, 0.5) 30%,
    rgba(0, 200, 200, 0.7) 100%
  );
  //   background-image: linear-gradient(to right, #fc5c7d, #6a82fb);
  //   background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
  //   background-image: linear-gradient(
  //     225deg,
  //     rgba(156, 240, 248, 0.7) 11.2%,
  //     rgba(110, 123, 251, 0.7) 91.1%
  //   );
  border-radius: 5px;
  // margin: 5px;

  width: 100%;

  @media ${device.tablet} {
    width: 100%;
  }
`;
const PaddingBox = styled.div`
  @media ${device.tablet} {
    height: 20px;
  }
`;
