import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
import AllBlocksAndCourses from "./AllBlocksAndCourses";
import { device } from "../../styles/breakpoints";
import { Link } from "react-router-dom";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import GridLoader from "react-spinners/GridLoader";
import { CiCircleRemove } from "react-icons/ci";
import "animate.css";
import SearchCourses from "../Dashboard/CourseFilter/SearchCourses";
import CourseSearchResult from "../Dashboard/CourseSearchResult";
import bookshelf from "../../assets/images/bookshelf.png";
import CourseFilterButtonSide from "../Dashboard/CourseFilter/CourseFilterButtonSide";

function CourseFIlterResultDesktop({ filterState, dropDownState, sidePanel }) {
  const { filterTermsArr, setFilterTermsArr } = filterState;
  // const [userSearch, setUserSearch] = useState([]);

  const [searchBarTerms, setSearchBarTerms] = useState("");

  const courses = FetchCoursefromSanity();

  const termsArr = Object.keys(filterTermsArr);

  console.log("🚀 ~ CourseFIlterResultDesktop ~ termsArr:", termsArr);

  const { darkThemeActive } = useContext(UserContext);
  const builder = imageUrlBuilder(sanityClient);

  const { courseFilterMobileisOpen, setCourseFilterMobileisOpen } = sidePanel;

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  let content;
  // let filteredCourses;

  // useEffect(() => {
  //   let filteredCourses = coursesSearchResult?.filter((item) => {
  //     return (
  //       (item.name && termsArr.some((term) => item.name.includes(term))) ||
  //       (item.blockName &&
  //         termsArr.some((term) => item.blockName.includes(term))) ||
  //       (item.courseName &&
  //         termsArr.some((term) => item.courseName.includes(term))) ||
  //       (item.subject && termsArr.some((term) => item.subject.includes(term)))
  //     );
  //   });

  //   setCoursesSearchResult(filteredCourses);
  // }, [termsArr]);

  // content to render if no search terms selected or no result
  if (!termsArr.length) {
    content = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p>Start by searching or filtering...</p>

        <img
          style={{
            height: "160px",
            width: "160px",
            borderRadius: "5px",
          }}
          src={bookshelf}
          alt=""
        />
      </div>
    );
  }
  // // map
  // else if (!coursesSearchResult) {
  //   content = <p>Sorry, no search result</p>;
  // }

  // else {
  //   // filterd values present render results
  //   content = filteredCourses?.map((item, index) => {
  //     // console.log("🚀 ~ content ~ item:", item);

  //     const imgcontent = item.coverImage ? (
  //       <img
  //         alt=""
  //         style={{
  //           height: "100px",
  //           width: "100px",
  //         }}
  //         src={imgurlFor(item.coverImage.asset._ref)}
  //       />
  //     ) : null;
  //     return (
  //       <Link
  //         className="animate__animated animate__fadeIn"
  //         style={{
  //           display: "flex",
  //           width: "100%",
  //           textDecoration: "none",
  //           animationDelay: `${index / 20}s`,
  //         }}
  //         to={`/courses/${item.subject}/${item.courseName}`}
  //       >
  //         <Box darkThemeActive={darkThemeActive}>
  //           <Text>
  //             {" "}
  //             <p
  //               style={{
  //                 fontSize: "12px",
  //                 listStyle: "none",
  //                 paddingLeft: "10px",
  //                 fontWeight: "600",
  //               }}
  //             >
  //               {item.subject}
  //             </p>
  //             <p
  //               style={{
  //                 fontSize: "12px",
  //                 listStyle: "none",
  //                 padding: "12px",
  //               }}
  //             >
  //               {item.courseName}
  //             </p>
  //             <p
  //               style={{
  //                 fontSize: "13px",
  //                 listStyle: "none",
  //                 padding: "11px",
  //               }}
  //             >
  //               {" "}
  //               {item.blockName}{" "}
  //             </p>
  //           </Text>

  //           {imgcontent ? (
  //             <Image>{imgcontent}</Image>
  //           ) : (
  //             <></> ||
  //             //   <Img
  //             //     src={
  //             //       imgurl
  //             //         ? imgurl.imageUrl
  //             //         : "https://stpauls.fra1.digitaloceanspaces.com/wp-content/uploads/2022/04/28130914/SPS-logo-centred-POS.png"
  //             //     }
  //             //   ></Img> ||
  //             null
  //           )}
  //         </Box>
  //       </Link>
  //     );
  //   });
  // }

  // if (!content) {
  //   content = (
  //     <Loader>
  //       <GridLoader
  //         color={"rgb(0, 250, 250, 0.5)"}
  //         // loading={loading}
  //         // cssOverride={override}
  //         size={25}
  //         aria-label="Loading Spinner"
  //         data-testid="loader"
  //       />
  //     </Loader>
  //   );
  // }

  const handleRemoveBtnClicked = (term) => {
    const keyToRemove = term;

    setFilterTermsArr((prevVal) => {
      const updated = { ...prevVal };
      delete updated[term];
      return updated;
    });
  };
  const searchTermsButtons = termsArr.map((term) => {
    return (
      <div
        className=" animate__animated animate__fadeIn animate__faster"
        darkThemeActive={darkThemeActive}
        style={{
          paddingLeft: "10px",
          height: "40px",
          minWidth: "150px",
          border: "1px solid rgb(0, 245, 245)",
          padding: "3px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "13px",
          margin: "2px",

          backgroundColor: darkThemeActive
            ? ThemeStyles.lightThemePrimaryBackgroundColor
            : ThemeStyles.darkThemeSecondaryBackgroundColor,

          boxShadow: darkThemeActive
            ? ThemeStyles.lightThemeMainBoxShadow
            : ThemeStyles.darkThemeMainBoxShadow,
        }}
      >
        {term}

        <RemoveBtn
          onClick={() => handleRemoveBtnClicked(term)}
          darkThemeActive={darkThemeActive}
        >
          {
            <CiCircleRemove
              fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
              darkThemeActive={darkThemeActive}
              size={30}
            />
          }
        </RemoveBtn>
      </div>
    );
  });

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <CourseFilterButtonSide
            sidePanel={{
              courseFilterMobileisOpen,
              setCourseFilterMobileisOpen,
            }}
          />
          <SearchCourses
            searchBarTerms={searchBarTerms}
            setSearchBarTerms={setSearchBarTerms}
            // termsArr={termsArr}
            // setCoursesSearchResult={setCoursesSearchResult}
            // coursesSearchResult={coursesSearchResult}
            // search={{ setUserSearch }}
          />
        </div>

        <div style={{ height: "10px", width: "100%" }}></div>
        {searchTermsButtons}
      </div>

      <CourseSearchResult
        searchBarTerms={searchBarTerms}
        setSearchBarTerms={setSearchBarTerms}
        termsArr={termsArr}
        // setCoursesSearchResult={setCoursesSearchResult}
        // coursesSearchResult={coursesSearchResult}
        // data={userSearch}
      ></CourseSearchResult>


      
    </Wrapper>
  );
}

export default CourseFIlterResultDesktop;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  font-weight: 400;

  align-items: center;
  border-radius: 5px;
  padding: 15px;
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

const Loader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const RemoveBtn = styled.button`
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor};
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

const Outer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
  background-color: rgb(255, 255, 255);
  border-radius: 5px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  @media ${device.desktop} {
    width: 100%;
  }

  //
`;

const SuggestedCourse = styled.div`
  display: none;
  @media (min-width: 550px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid red;
  }
`;

const SuggestCourseMobile = styled.div`
  display: flex;

  @media ${device.mobileL} {
    display: none;
  }
`;

const NoResultDesktop = styled.div`
  display: none;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoResultMobile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  @media (min-width: 550px) {
    display: none;
  }
`;
