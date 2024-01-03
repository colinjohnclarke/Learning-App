import "../App.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import "animate.css";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../createclient";
import styled from "styled-components";
import MCQ from "../components/MCQ/MCQ";
import StudentTextInputWrapper from "../components/SingleStudentInput/StudentTextInputWrapper";
import DualBoxSelectionWrapper from "../components/DualSelection/DualBoxSelectionWrapper";
import DragandDropWrapper from "../components/Drag&Drop/DragandDropWrapper";
import ContinueBtn from "../components/Buttons/ContinueBtn";
import GapFillWrapper from "../components/GapFill/GapFillWrapper";
import IncorrectWordWrapper from "../components/IncorrectWordIdentifier/IncorrectWordWrapper";
import FillMissingValuesTable from "../components/Tables/MissingData/FillMissingValues";
import LineChart from "../components/Charts/Line/LineChart";
import LargeTable from "../components/Tables/TableFromLineData";
import Scatter from "../components/Charts/Scatter/Scatter";
import MovingSliderWrapper from "../components/MovingSlider/MovingSliderWrapper";
import TextSlideShowWrapper from "../components/TextSlideShow/TextSlideShowWrapper";
import { useSelector, useDispatch } from "react-redux";
import { updateProgressPercentage } from "../features/ProgressBar/ProgressBar";
import PostBlockPointsReveal from "../components/Data/PostBlockPointsReveal/PostBlockPointsReveal";
import { GrNext } from "react-icons/gr";
import GridLoader from "react-spinners/GridLoader";
import ImagefromSanity from "../config/sanity/ImagefromSanity";

import {
  updateBlockCompleted,
  resetUserScore,
  resetAllSlidesSeen,
  resetBlockedCompleted,
  resetPointsAvailableArr,
  resetSlideNumber,
  updatePercentage,
} from "../features/CurrentBlockProgressData/currentblockprogressdata";
import { useUpdateUserDataMutation } from "../features/api/UserData/userDataSlice";
import { useGetUserByEmailQuery } from "../features/api/UserData/userDataSlice";
import { UserContext } from "../App";
import CheckScoreBtn from "../components/Buttons/CheckScoreBtn";
import StartQuizBtn from "../components/Buttons/StartQuizBtn";
import { device } from "../styles/breakpoints";
import CourseDetails from "../components/CourseDetails/CourseDetails";

function Main() {
  // console.log("🚀 ~ file: Main.jsx:47 ~ Main ~ navState:", navState);
  const [data, setData] = useState([]);

  const [showPointsSummary, setShowPointsSummary] = useState(false);
  const [itemDisplayed, setItemDisplayed] = useState([]);
  const [blockDataSubmittedtoDB, setBlockDataSubmittedtoDB] = useState(false);

  const dispatch = useDispatch();

  const currentblockprogressdata = useSelector(
    (state) => state.currentblockprogressdata
  );

  /// use params from search function
  const { subject, courseName, blockName } = useParams();

  const startTimeRef = useRef(Date.now());

  const userData = useContext(UserContext);

  // const { selectedNav, setSelectedNav } = navState;

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "${subject}" && name == "${blockName}" ]
        { subject_skills[]->, coverImage, slider, incorrect_words_from_text, order_items_drag_drop,
                    name, tags, textblock1, textblock2, textblock3, textblock4, textblock5,  hint, problem_keywords[]->,  example_problem, MCQ_INPUTS, MCQ_MATH_INPUTS,  student_text_input, gap_fill, incorrect_words_from_text, table, line_graph_data,
                    standard_tables, standard_table_variable_names
                    }`
      )
      .then((result) => setData(result[0]))
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   setSelectedNav((prevState) => ({ courseView: "true" }));

  //   console.log("COLINSSSS", selectedNav);
  // }, []);

  // console.log("selectedNav", selectedNav);

  const {
    subject_skills,
    skills,
    problem_keywords,
    tags,
    MCQ_INPUTS,
    order_items_drag_drop,
    slider,
    gap_fill,
    incorrect_words_from_text,
    standard_table_variable_names,
    standard_tables,
    student_text_input,
    table,
    line_graph_data,
  } = data;

  const slideShowDataArr = [
    data.textblock1,
    data.textblock2,
    data.textblock3,
    data.textblock4,
    data.textblock5,
  ];

  function objectToArray(obj) {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return { key, children: objectToArray(value) };
      } else {
        return { key, value };
      }
    });
  }

  const arr = objectToArray(data);

  const newData = arr.flatMap((item) => {
    const type = item.key;
    const position = item.children?.flatMap((subItem) => {
      const positionVal = subItem.children
        ?.filter((subsub) => subsub.key === "position")
        ?.map((subsub) => subsub.value);

      return { positionVal };
    });

    return item.children ? { type, position } : null;
  });

  const filterNullValues = newData
    .filter(
      (item) => item !== null && item.position && item.position.length !== 0
    ) // Add null and position existence check
    .sort((a, b) => a.position - b.position);

  const GetVal = filterNullValues.flatMap((item) => ({
    type: item.type,
    position: item.position.map((item) => item.positionVal),
  }));

  const flat = GetVal.filter((item) =>
    item.position.some((item) => item && item.length !== 0)
  ).map((item) => ({ type: item.type, position: item.position.flat() }));

  const testData = flat
    .flatMap((item) => {
      let type = item.type;

      const mapcomp = item.position.map((subItem, index) => {
        return {
          position: subItem,
          type,
          index,
        };
      });

      return mapcomp;
    })
    .sort((a, b) => {
      return a.position - b.position;
    });

  const itemData = testData.map((item) => {
    let component = null;

    switch (item.type) {
      case "MCQ_INPUTS":
        component = <MCQ data={[MCQ_INPUTS[item.index]]} />;
        break;
      case "student_text_input":
        component = (
          <StudentTextInputWrapper data={[student_text_input[item.index]]} />
        );
        break;
      case "table":
        component = <FillMissingValuesTable data={[table[item.index]]} />;
        break;
      case "incorrect_words_from_text":
        component = (
          <IncorrectWordWrapper
            data={[incorrect_words_from_text[item.index]]}
          />
        );
        break;
      case "gap_fill":
        component = <GapFillWrapper data={[gap_fill[item.index]]} />;
        break;
      // case "slider":
      //   component = <MovingSliderWrapper data={[slider[item.index]]} />;
      //   break;

      case "slider":
        component = <DualBoxSelectionWrapper data={[slider[item.index]]} />;
        break;
      case "order_items_drag_drop":
        component = (
          <DragandDropWrapper data={[order_items_drag_drop[item.index]]} />
        );
        break;
      default:
        component = <></>;
        break;
    }

    return component;
  });

  let itemDisplayedInitialState = null;

  if (itemData) {
    itemDisplayedInitialState = itemData.map((item) => false);
  }

  useEffect(() => {
    setItemDisplayed(itemDisplayedInitialState);
  }, [
    itemDisplayedInitialState === null
      ? null
      : itemDisplayedInitialState.length,
  ]);

  let displayedItems = itemData.map((item, index) => ({
    component: item,
    displayed: itemDisplayed[index],
  }));

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

  // when start quiz is clicked, state the displayed object Arr at position 1 to true so quiz startrs

  useEffect(() => {
    if (currentblockprogressdata.startQuiz) {
      console.log("start quiz");

      setItemDisplayed((prevState) => {
        const newState = [...prevState];
        newState[1] = true;
        return newState;
      });
    }
  }, [currentblockprogressdata.startQuiz]);

  const renderedItems = [
    <CourseDetails
      className="animate__animated animate__fadeIn"
      data={data.coverImage || ""}
      subject={subject}
      courseName={courseName}
      blockName={blockName}
    />,

    <Container className="animate__animated animate__fadeIn">
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
              ref={itemRefs[index]}
              className="animate__animated animate__fadeIn "
            >
              {item.component}

              {index < itemData.length && index !== itemData.length - 1 && (
                <ContinueBtn
                  onClick={() => {
                    handleContinueBtnClicked(index + 1);
                  }}
                />
              )}

              {index === itemData.length - 1 && (
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

  let currentPositioninCourse = numOfDisplayedItems + slideVal;

  if (!showPointsSummary) {
    calculateProgress =
      ((currentPositioninCourse - 1) / totalLengthofCourse) * 100;
  } else calculateProgress = 100;

  const [updateUserData] = useUpdateUserDataMutation();

  useEffect(() => {
    dispatch(
      updatePercentage(
        (currentblockprogressdata.userScore /
          currentblockprogressdata.pointsAvailable) *
          100
      )
    );

    const updateUserDataFN = async () => {
      // console.log("updateUserDataFN");
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

  const loader = (
    <Loader>
      <GridLoader
        color={"rgb(0, 250, 250, 0.5)"}
        // loading={loading}
        // cssOverride={override}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Loader>
  );
  return (
    <Wrapper>
      {data.length === 0 && loader}
      {renderedItems}
      {showPointsSummary && <PostBlockPointsReveal></PostBlockPointsReveal>}
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SlideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
  background-color: rgba(239, 239, 249, 1);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);

  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
  width: 100%;
  scroll-padding: 120px;
  scroll-margin: 47px;

  @media ${device.mobileL} {
    position: relative;
    width: 100%;
    max-width: 1000px;
    scroll-margin: 75px;
  }
`;

const Item = styled.div`
  // scroll-padding: 100px;
  // scroll-margin: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
  border-radius: 5px;
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
