// import "../../App.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import "animate.css";
import styled from "styled-components";
import TextSlideShowWrapper from "../../components/TextSlideShow/TextSlideShowWrapper";
import { useSelector, useDispatch } from "react-redux";
import { updateProgressPercentage } from "../../redux/ProgressBar/ProgressBar";
import PostBlockPointsReveal from "../../components/Data/PostBlockPointsReveal/PostBlockPointsReveal";
import Loader from "../../components/Loader";
import { ThemeStyles } from "../../styles/ThemeStyles";
import ActionButton from "./OrderingItems/ActionButton";
import ReturnToTopBtn from "./ReturnToTopBtn";
import { useUpdateUserDataMutation } from "../../redux/api/UserData/userDataSlice";
import { useUpdateEnrolledCourseMutation } from "../../redux/api/UserData/enrolledCourseDataSlice";

import {
  updateBlockCompleted,
  resetUserScore,
  resetAllSlidesSeen,
  resetBlockedCompleted,
  resetPointsAvailableArr,
  resetSlideNumber,
  updateAllSlidesSeen,
} from "../../redux/CurrentBlockProgressData/currentblockprogressdata";

import { UserContext } from "../../App";
import { device } from "../../styles/breakpoints";
import CourseDetails from "../../components/CourseDetails/CourseDetails";
import FetchBlockDataFromSanity from "./FetchBlockDataFromSanity";
import Header from "../../components/CourseModeHeader/CourseModeHeader";
import OrderItemsMain from "./OrderingItems/OrderItemsMain";
import { ActionButtonContext } from "./OrderingItems/ActionButtonContext";
import MainUpdate from "./CourseCompletionUpdates/MainUpdate";

function Main() {
  const [blockData, setBlockData] = useState([]);
  console.log("🚀 ~ Main ~ blockData:", blockData);
  const [showPointsSummary, setShowPointsSummary] = useState(false);
  const [displayedComponentCount, setDisplayedComponentCount] = useState(1);
  const [buttonState, setButtonState] = useState({ value: "undefined" });
  const dispatch = useDispatch();
  const { courseCode, lessonName, subject, courseName } = useParams();

  console.log(
    "code",
    courseCode,
    "name",
    lessonName,
    "sub",
    subject,
    "counseName",
    courseName
  );

  const { userData, darkThemeActive } = useContext(UserContext);
  const [currentslide, setCurrentSlide] = useState(0);
  const [currentSlidesDesktop, setCurrentSlideDesktop] = useState(0);

  FetchBlockDataFromSanity(courseCode, lessonName, setBlockData);

  const currentblockprogressdata = useSelector(
    (state) => state.currentblockprogressdata
  );

  const [updateUserData] = useUpdateUserDataMutation();
  const [updateEnrolledCourse] = useUpdateEnrolledCourseMutation();

  let arrayOfAflComponents;

  if (blockData) {
    arrayOfAflComponents = OrderItemsMain(blockData);
    console.log("blockData", blockData);
  }

  useEffect(() => {
    dispatch(resetUserScore());
    dispatch(resetAllSlidesSeen());
    dispatch(resetBlockedCompleted());
    dispatch(resetPointsAvailableArr());
    dispatch(resetSlideNumber());
  }, []);

  const itemRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  let slideShowDataArr;
  if (blockData) {
    slideShowDataArr = [
      blockData.textblock1,
      blockData.textblock2,
      blockData.textblock3,
      blockData.textblock4,
      blockData.textblock5,
    ];
  }

  const slidesrefArr = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    if (
      currentblockprogressdata.currentSlide + 1 ===
      currentblockprogressdata.slideNumber
    ) {
      dispatch(updateAllSlidesSeen());
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentblockprogressdata.currentSlide]);

  const handleActionBtnClick = () => {
    if (
      currentblockprogressdata.currentSlide !==
        currentblockprogressdata.slideNumber &&
      !currentblockprogressdata.isDesktopSlideShow
    ) {
      setCurrentSlide((prev) => prev + 1);
    } else if (
      !currentblockprogressdata.isDesktopSlideShow &&
      currentblockprogressdata.allSlidesSeen
    ) {
      setDisplayedComponentCount((val) => val + 1);
    } else if (
      currentblockprogressdata.isDesktopSlideShow &&
      currentblockprogressdata.allSlidesSeen
    ) {
      setDisplayedComponentCount((val) => val + 1);
    }
  };

  const handleCheckScoreBtnClick = () => {
    setDisplayedComponentCount((val) => val + 1);
    setShowPointsSummary(true);
    dispatch(updateBlockCompleted());
  };

  useEffect(() => {
    if (displayedComponentCount > 1) {
      itemRefs[displayedComponentCount - 2].current?.scrollIntoView({
        alignToTop: true,
        behavior: "smooth",
      });
    } else {
      itemRefs[0].current?.scrollIntoView({
        alignToTop: true,
        behavior: "smooth",
      });
    }
  }, [displayedComponentCount]);

  const renderedItems = [
    blockData && (
      <CourseDetails
        darkThemeActive={darkThemeActive}
        className="animate__animated animate__fadeIn"
        data={blockData.coverImage || ""}
        subject={subject}
        topic={blockData?.topics?.[0]?.topicName || ""}
        courseName={courseName}
        blockName={lessonName}
      />
    ),

    <Container
      style={{ width: "100%", maxWidth: "900px" }}
      darkThemeActive={darkThemeActive}
      className="animate__animated animate__fadeIn"
    >
      <TextSlideShowWrapper
        slidesrefArr={slidesrefArr}
        currentslide={currentslide}
        setCurrentSlide={setCurrentSlide}
        currentSlidesDesktop={currentSlidesDesktop}
        setCurrentSlideDesktop={setCurrentSlideDesktop}
        data={slideShowDataArr}
      />
    </Container>,

    arrayOfAflComponents?.map(
      (item, index) =>
        index < displayedComponentCount && (
          <Item
            ref={itemRefs[index]}
            style={{
              display: index + 1 < displayedComponentCount ? "block" : "none",
            }}
            key={index}
            className="animate__animated animate__fadeIn "
          >
            <Container
              darkThemeActive={darkThemeActive}
              className="animate__animated animate__fadeIn "
            >
              {item}
            </Container>
          </Item>
        )
    ),
  ];

  return (
    <ActionButtonContext.Provider value={{ buttonState, setButtonState }}>
      <Wrapper darkThemeActive={darkThemeActive}>
        <Header />
        {blockData?.length === 0 && <Loader></Loader>}

        {renderedItems}

        <Whitespace />
        <Footer>
          <ActionButton
            handleCheckScoreBtnClick={handleCheckScoreBtnClick}
            displayedComponentCount={displayedComponentCount}
            setDisplayedComponentCount={setDisplayedComponentCount}
            handleActionBtnClick={handleActionBtnClick}
            arrayOfAflComponents={arrayOfAflComponents}
          ></ActionButton>

          <ReturnToTopBtn style={{ display: "none" }} />
        </Footer>

        <MainUpdate
          showPointsSummary={showPointsSummary}
          updateUserDataFN={updateUserData}
          updateEnrolledCourseFN={updateEnrolledCourse}
          // subject={subject}
          userId={userData?.user._id}
          courseLength={arrayOfAflComponents?.length}
          displayedComponentCount={displayedComponentCount}
          // blockName={lessonName}
          // courseName={courseName}
        ></MainUpdate>
        {showPointsSummary && <PostBlockPointsReveal />}
      </Wrapper>
    </ActionButtonContext.Provider>
  );
}

export default React.memo(Main);

const Whitespace = styled.div`
  height: 100px;

  @media ${device.laptop} {
    height: 200px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Container = styled.div`
  display: flex;
  border: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

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
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 10px;
`;

const Item = styled.div`
  scroll-margin: 55px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 16px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;

  width: 98%;

  @media ${device.laptop} {
    max-width: 900px;
  }

  // @media ${device.laptop} {
  //   // height: 1000px;
  //   // transition: 0.4s;
  //   // min-height: auto;
  //   // position: relative;
  // }
`;

const Box = styled.div`
  margin-bottom: 5px;

  // @media ${device.mobileL} {
  //   height: 10vh;
  //   width: 5vw;
  // }
`;

/* <ClickIncorrectWord
        click_incorrect_words_text={click_incorrect_words_text}
        click_incorrect_words_text_body={click_incorrect_words_text_body}
      /> */

// <h1>Skills: </h1>
// <div>
//   {skills?.map((skill) => {
//     return (
//       <div>
//         <p>{skill.skill_name}</p>
//       </div>
//     );
//   })}
// </div>

/* <Item>
        <PortableText
          value={block2}
          components={myPortableTextComponents}
        ></PortableText>
        <ContinueBtn />
      </Item> */

// [
//   {
//     "_key": "6d650934aeed",
//     "_type": "tag",
//     "chart_title": "Line and Scatter Plot",
//     "trace_1_label": "10 deg C",
//     "trace_1_x_values": "5, 10, 15, 20",
//     "trace_1_y_values": "1.3, 1.5, 1.7, 1.9",
//     "trace_2_label": "15 deg C",
//     "trace_2_x_values": "5, 10, 15, 20",
//     "trace_2_y_values": "1.5, 1.8, 2.4, 2.5",
//     "trace_3_label": "20 deg C",
//     "trace_3_x_values": "5, 10, 15, 20",
//     "trace_3_y_values": "1.9, 2.2, 2.9, 3.1",
//     "trace_4_label": "25 deg C",
//     "trace_4_x_values": "5, 10, 15, 20",
//     "trace_4_y_values": "1.9, 2.4, 3.1, 3.1",
//     "x_axis_name": "concentration(mol/dm3)",
//     "y_axis_name": "rate of reaction g/sec"
//   }
// ]
