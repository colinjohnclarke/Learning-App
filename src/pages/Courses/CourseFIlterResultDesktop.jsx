import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
import AllBlocksAndCourses from "./AllBlocksAndCourses";
import { device } from "../../styles/breakpoints";
import { Link } from "react-router-dom";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";

function CourseFIlterResultDesktop({ filterTermsArr }) {
  const courses = FetchCoursefromSanity();
  console.log("🚀 ~ CourseFIlterResultDesktop ~ courses:", courses);

  const arr = Object.keys(filterTermsArr);
  console.log("🚀 ~ CourseFIlterResultDesktop ~ arr:", arr);

  const { darkThemeActive } = useContext(UserContext);

  //   const filteredCourses = courses.filter((item) => {
  //     return item.filter((subItem) => {
  //       return subItem.name.includes("Biology");
  //     });
  //   });

  //   console.log("🚀 ~ filteredCourses ~ filteredCourses:", filteredCourses);

  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const content = courses.map((item, index) => {
    console.log("🚀 ~ content ~ item:", item);

    const imgcontent = item.coverImage ? (
      <img
        alt=""
        style={{
          height: "100px",
          width: "100px",
        }}
        src={imgurlFor(item.coverImage.asset._ref)}
      />
    ) : null;
    return (
      <Link
        className="animate__animated animate__fadeIn"
        style={{
          display: "flex",
          width: "100%",
          textDecoration: "none",
          animationDelay: `${index / 20}s`,
        }}
        to={`/courses/${item.subject}/${item.courseName}`}
      >
        <Box darkThemeActive={darkThemeActive}>
          <Text>
            {" "}
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                paddingLeft: "10px",
                fontWeight: "600",
              }}
            >
              {item.subject}
            </p>
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                padding: "12px",
              }}
            >
              {item.courseName}
            </p>
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                padding: "12px",
              }}
            >
              {" "}
              {item.blockName}{" "}
            </p>
          </Text>

          {imgcontent ? (
            <Image>{imgcontent}</Image>
          ) : (
            <></> ||
            //   <Img
            //     src={
            //       imgurl
            //         ? imgurl.imageUrl
            //         : "https://stpauls.fra1.digitaloceanspaces.com/wp-content/uploads/2022/04/28130914/SPS-logo-centred-POS.png"
            //     }
            //   ></Img> ||
            null
          )}
        </Box>
      </Link>
    );
  });

  return <Wrapper darkThemeActive={darkThemeActive}>{content}</Wrapper>;
}

export default CourseFIlterResultDesktop;

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 400;

  align-items: center;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 100%;
`;

const Box = styled.a`
  height: 50px;
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

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  div,
  strong {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
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

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 5px;
`;

const SeeAllBtn = styled.button`
  // // display: flex;

  // // justify-content: center;
  border: none;
  background-color: rgb(240, 245, 250);
`;

const SelectionDiv = styled.div`
  width: 98%;
  max-width: 900px;
`;

const Tags = styled.div`
  height: 40px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justifty-content: flex-start;
`;

const Select = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
  transition: 0.3s;

  @media ${device.tablet} {
    width: 33%;
  }
`;

const SelectionBar = styled.div`
  border-radius: 10px;
  height: 4px;
  width: 33%;
  background: linear-gradient(
    225deg,
    rgba(39, 106, 245, 1) 0%,
    rgba(0, 200, 200, 1) 100%
  );

  // @media ${device.tablet} {
  //   width: 100%;
  // }
`;

const Filter = styled.div`
  // display: flex;
  // flex-direction: row;
  // justify-content: space-around;
  // align-items: center;
  border: 1px solid;
  width: 100%;
`;

const Image = styled.div`
  height: 100%;

  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);

  @media ${device.mobileL} {
  }
`;

const PlaceholderImg = styled.div``;
