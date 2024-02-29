import "../../App.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import "animate.css";
import styled from "styled-components";
import ContinueBtn from "../../components/Buttons/ContinueBtn";
import TextSlideShowWrapper from "../../components/TextSlideShow/TextSlideShowWrapper";
import { useSelector, useDispatch } from "react-redux";
import { updateProgressPercentage } from "../../features/ProgressBar/ProgressBar";
import PostBlockPointsReveal from "../../components/Data/PostBlockPointsReveal/PostBlockPointsReveal";
import Loader from "../../components/Loader";
import { ThemeStyles } from "../../styles/ThemeStyles";
import objectToArray from "./ObjectToArray";
import FilterBlockDataNullValues from "./OrderingItems/FilterBlockDataNullValues";
import RemoveBlockItemsWithoutData from "./OrderingItems/RemoveBlockItemsWithoutData";
import {
  updateBlockCompleted,
  resetUserScore,
  resetAllSlidesSeen,
  resetBlockedCompleted,
  resetPointsAvailableArr,
  resetSlideNumber,
  updatePercentage,
} from "../../features/CurrentBlockProgressData/currentblockprogressdata";
import { useUpdateUserDataMutation } from "../../features/api/UserData/userDataSlice";
import { useUpdateEnrolledCourseMutation } from "../../features/api/UserData/enrolledCourseDataSlice";
import { UserContext } from "../../App";
import CheckScoreBtn from "../../components/Buttons/CheckScoreBtn";
import StartQuizBtn from "../../components/Buttons/StartQuizBtn";
import { device } from "../../styles/breakpoints";
import CourseDetails from "../../components/CourseDetails/CourseDetails";
import FetchBlockDataFromSanity from "./FetchBlockDataFromSanity";
import CreateArrayOfItemsInPosition from "./OrderingItems/CreateArrayOfItemsInPosition";
import CreateArrayOfAflComponents from "./CreateArrayOfAflComponents";
import Header from "../../components/Header/Header";

function Main() {
  const { userData, darkThemeActive } = useContext(UserContext);

  const [blockData, setBlockData] = useState([]);

  const [showPointsSummary, setShowPointsSummary] = useState(false);
  const [itemDisplayed, setItemDisplayed] = useState([]);
  const [blockDataSubmittedtoDB, setBlockDataSubmittedtoDB] = useState(false);
  const dispatch = useDispatch();
  /// use params from search function
  const { subject, courseName, blockName } = useParams();

  const currentblockprogressdata = useSelector(
    (state) => state.currentblockprogressdata
  );
  const startTimeRef = useRef(Date.now());
  FetchBlockDataFromSanity(subject, blockName, setBlockData);

  //ordering items

  // remove textblock data from block data obj as not ordered

  // fetch data based on subject and blockname from

  console.log("🚀 ~ Main ~ blockData:", blockData);

  // convert OBJ to Array so can be used ordered into position

  const convertedArrFromObj = objectToArray(blockData);
  // console.log("🚀 ~ Main ~ convertedArrFromObj:", convertedArrFromObj);

  const removeItemsNamesArr = [
    "textblock1",
    "textblock2",
    "textblock3",
    "textblock4",
    "textblock5",
    "coverImage",
    "name",
    "problem_keywords",
    "tags",
  ];

  const removedNonQuizElementsList = convertedArrFromObj?.filter((item) => {
    return !removeItemsNamesArr.includes(item.key);
  });

  // Remove empty items from array

  const blockItemsWithoutBlanks = RemoveBlockItemsWithoutData(
    removedNonQuizElementsList
  );

  // console.log("🚀 ~ Main ~ blockItemsWithoutBlanks:", blockItemsWithoutBlanks);

  const filterBlockDataNullValues = FilterBlockDataNullValues(
    blockItemsWithoutBlanks
  );

  // console.log("filterBlockDataNullValues", filterBlockDataNullValues);

  const arrayOfItemsWithPosition = CreateArrayOfItemsInPosition(
    filterBlockDataNullValues
  );

  // render AFL components based on type
  const arrayOfAflComponents = CreateArrayOfAflComponents(
    arrayOfItemsWithPosition,
    blockData
  );

  let itemDisplayedInitialState = null;

  if (arrayOfAflComponents) {
    itemDisplayedInitialState = arrayOfAflComponents.map((item) => false);
  }

  useEffect(() => {
    setItemDisplayed(itemDisplayedInitialState);
  }, [
    itemDisplayedInitialState === null
      ? null
      : itemDisplayedInitialState.length,
  ]);

  let displayedItems = arrayOfAflComponents.map((item, index) => ({
    component: item,
    displayed: itemDisplayed[index],
  }));
  // console.log("🚀 ~ displayedItems ~ displayedItems:", displayedItems);

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

  // handle continue btn clicked and uodate item displayedstate array, use a slight delay for the scroll into view function.
  const handleContinueBtnClicked = (index) => {
    setItemDisplayed((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });

    setTimeout(() => {
      itemRefs[index].current?.scrollIntoView({
        alignToTop: true,
        behavior: "smooth",
      });
    }, 0);
  };

  const slideShowDataArr = [
    blockData.textblock1,
    blockData.textblock2,
    blockData.textblock3,
    blockData.textblock4,
    blockData.textblock5,
  ];

  // when start quiz is clicked, state the displayed object Arr at position 1 to true so quiz startrs

  useEffect(() => {
    if (currentblockprogressdata.startQuiz) {
      setItemDisplayed((prevState) => {
        const newState = [...prevState];
        newState[1] = true;
        return newState;
      });
    }
  }, [currentblockprogressdata.startQuiz]);

  const renderedItems = [
    <CourseDetails
      darkThemeActive={darkThemeActive}
      className="animate__animated animate__fadeIn"
      data={blockData.coverImage || ""}
      subject={subject}
      courseName={courseName}
      blockName={blockName}
    />,

    <Container
      darkThemeActive={darkThemeActive}
      className="animate__animated animate__fadeIn"
    >
      <TextSlideShowWrapper
        length={slideShowDataArr.length}
        data={slideShowDataArr}
      />
      {currentblockprogressdata.allSlidesSeen && (
        <StartQuizBtn
          onClick={() => {
            handleContinueBtnClicked(0);
          }}
        ></StartQuizBtn>
      )}
    </Container>,

    <Box> </Box>,

    ...displayedItems.map(
      (item, index) =>
        item.displayed && (
          <Item key={index} className="animate__animated animate__fadeIn ">
            <Container
              darkThemeActive={darkThemeActive}
              ref={itemRefs[index]}
              className="animate__animated animate__fadeIn "
            >
              {item.component}

              {index < arrayOfAflComponents.length &&
                index !== arrayOfAflComponents.length - 1 && (
                  <ContinueBtn
                    onClick={() => {
                      handleContinueBtnClicked(index + 1);
                    }}
                  >
                    {" "}
                    Continue
                  </ContinueBtn>
                )}

              {index === arrayOfAflComponents.length - 1 && (
                <CheckScoreBtn
                  onClick={() => {
                    setShowPointsSummary(true);
                  }}
                />
              )}
            </Container>
          </Item>
        )
    ),
  ];

  let slideVal = 0;
  let calculateProgress = 0;
  let numOfDisplayedItems = 0;
  let totalLengthofCourse = null;

  // calculate current poistion in text Slideshow

  if (currentblockprogressdata.allSlidesSeen) {
    slideVal = currentblockprogressdata.slideNumber;
  } else slideVal = currentblockprogressdata.currentSlide;

  if (itemDisplayed.length) {
    totalLengthofCourse =
      itemDisplayed.length + currentblockprogressdata.slideNumber;
  }

  displayedItems.forEach((item) => {
    if (item.displayed) {
      numOfDisplayedItems++;
    }
  });

  let currentPositioninCourse = 0;

  currentPositioninCourse = numOfDisplayedItems + slideVal;

  if (!showPointsSummary) {
    calculateProgress =
      ((currentPositioninCourse - 1) / totalLengthofCourse) * 100;
  } else calculateProgress = 100;

  const [updateUserData] = useUpdateUserDataMutation();

  const [updateEnrolledCourse] = useUpdateEnrolledCourseMutation();

  useEffect(() => {
    dispatch(
      updatePercentage(
        (currentblockprogressdata.userScore /
          currentblockprogressdata.pointsAvailable) *
          100
      )
    );

    // dispatch(updatePercentage(calculateProgress));

    dispatch(updateProgressPercentage({ calculateProgress }));

    const updateUserDataFN = async () => {
      // console.log("updateUserDataFN");

      const updatedDetails = {
        id: userData?.user._id,
        Subject: subject,
        updateXP: currentblockprogressdata.userScore,
        updateTimeElapsed: elapsedTime,
        updatePercentageScore:
          (currentblockprogressdata.userScore /
            currentblockprogressdata.pointsAvailable) *
          100,
      };

      await updateEnrolledCourse(updatedDetails);

      // await updateUserData returns user to update local storage after respone

      await updateUserData({
        id: userData?.user._id,
        updateTimeElapsed: elapsedTime,
        quizScores: [
          {
            updateQuizId: blockName,
            updateSubject: subject,
            updateCourseName: courseName,
            updateScore: currentblockprogressdata.userScore,
            updateCompletionStatus: showPointsSummary,
            updateQuestionsAttempted:
              currentblockprogressdata.questionsAttempted,

            updatePercentageScore:
              (currentblockprogressdata.userScore /
                currentblockprogressdata.pointsAvailable) *
              100,
          },
        ],
      });
    };

    let elapsedTime = 0;

    if (calculateProgress === 100) {
      setShowPointsSummary((val) => true);
      dispatch(updateBlockCompleted());
      elapsedTime = Date.now() - startTimeRef.current;
      updateUserDataFN();
      setBlockDataSubmittedtoDB((val) => true);
    }
  }, [calculateProgress]);

  useEffect(() => {
    // setSelectedNav((prevState) => ({ courseView: "false" }));
    if (blockDataSubmittedtoDB) {
      dispatch(resetUserScore());
      dispatch(resetAllSlidesSeen());
      // dispatch(resetBlockedCompleted());
      dispatch(resetPointsAvailableArr());
      dispatch(resetSlideNumber());
    }
  }, [blockDataSubmittedtoDB]);

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <Header />
      {blockData.length === 0 && <Loader></Loader>}
      {renderedItems}
      {showPointsSummary && <PostBlockPointsReveal />}
    </Wrapper>
  );
}

export default Main;

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
  // border: 1px solid red;
  border: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
  width: 100%;
  scroll-padding: 120px;
  scroll-margin: 47px;

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

  @media ${device.mobileL} {
    position: relative;
    width: 100%;
    max-width: 1000px;
    scroll-margin: 75px;
    border: none;
  }
`;

const Item = styled.div`
  // scroll-padding: 100px;
  // scroll-margin: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin-bottom: 5px;
  // border-radius: 5px;
  width: 100%;

  // min-height: 700px;

  @media ${device.laptop} {
    height: 1000px;
    scroll-margin: 8vh;
    transition: 0.4s;
    min-height: auto;
    position: relative;
  }
`;

const Box = styled.div`
  margin-bottom: 5px;

  @media ${device.mobileL} {
    height: 10vh;
    width: 5vw;
  }
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
