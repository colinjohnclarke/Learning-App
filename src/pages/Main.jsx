import "../App.css";
import React, { useState, useEffect, useRef, useContext } from "react";
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
import { updateBlockCompleted } from "../features/CurrentBlockProgressData/currentblockprogressdata";
import { useUpdateUserDataMutation } from "../features/api/UserData/userDataSlice";
import { useGetUserByEmailQuery } from "../features/api/UserData/userDataSlice";
import { UserContext } from "../App";
import CheckScoreBtn from "../components/Buttons/CheckScoreBtn";
import StartQuizBtn from "../components/Buttons/StartQuizBtn";
import { device } from "../styles/breakpoints";

function Main() {
  const [data, setData] = useState([]);
  const [showPointsSummary, setShowPointsSummary] = useState(false);
  const [itemDisplayed, setItemDisplayed] = useState([]);

  const dispatch = useDispatch();

  const currentblockprogressdata = useSelector(
    (state) => state.currentblockprogressdata
  );

  let content_from_api = "biology_blocks";
  let content_name = "photosynthesis_required_practical";
  // let content_name = "kinetic_energy";

  const startTimeRef = useRef(Date.now());

  const userData = useContext(UserContext);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "${content_from_api}" && name == "${content_name}" ] 
        { subject_skills[]->, slider, incorrect_words_from_text, order_items_drag_drop, 
                    name, tags, textblock1, textblock2, textblock3, textblock4, textblock5,  hint, problem_keywords[]->,  example_problem, MCQ_INPUTS, MCQ_MATH_INPUTS,  student_text_input, gap_fill, incorrect_words_from_text, table, line_graph_data, 
                    standard_tables,standard_table_variable_names 
                    }`
      )
      .then((result) => setData(result[0]))
      .catch(console.error);
  }, []);

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

  // console.log("🚀 ~ flat:", flat);

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

  console.log(
    "🚀 ~ file: Main.jsx:281 ~ displayedItems ~ displayedItems:",
    displayedItems
  );

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
    <Item>
      <Container>
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
      </Container>
    </Item>,

    ...displayedItems.map(
      (item, index) =>
        item.displayed && (
          <Item ref={itemRefs[index]} key={index}>
            <Container>
              {item.component}

              {index < itemData.length && index !== itemData.length - 1 && (
                <ContinueBtn
                  onClick={() => {
                    handleContinueBtnClicked(index + 1);
                  }}
                />
              )}
            </Container>
          </Item>
        )
    ),
  ];

  // calculate current poistion in text Slideshow

  let slideVal = 0;
  let calculateProgress = 0;
  let numOfDisplayedItems = 0;
  let totalLengthofCourse = null;

  if (currentblockprogressdata.allSlidesSeen) {
    slideVal = currentblockprogressdata.slideNumber;
    console.log("allslides Seen");
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

  let currentPositioninCourse =
    numOfDisplayedItems + slideVal + (showPointsSummary ? 1 : 0);
  // calculating length of component list and pass to context for access to the progress bar

  let blockCompleted = false;

  calculateProgress = (currentPositioninCourse / totalLengthofCourse) * 100;

  dispatch(updateProgressPercentage({ payload: { calculateProgress } }));

  const [updateUserData] = useUpdateUserDataMutation();

  useEffect(() => {
    const updateUserDataFN = async () => {
      // console.log("updateUserDataFN");
      await updateUserData({
        id: userData?.user._id,
        updateTimeElapsed: elapsedTime,
        quizScores: [
          {
            updateQuizId: "Ccolin22223",
            updateScore: currentblockprogressdata.userScore,
            updateCompletionStatus: blockCompleted,
            updateQuestionsAttempted:
              currentblockprogressdata.questionsAttempted,
            updatePercentageScore: currentblockprogressdata.percentageScore,
          },
        ],
      });
    };

    let elapsedTime = 0;

    if (calculateProgress === 100) {
      dispatch(updateBlockCompleted());
      elapsedTime = Date.now() - startTimeRef.current;
      updateUserDataFN();
      // console.log("updateUserDataFN();");
    }
  }, [showPointsSummary]);

  return (
    <Wrapper>
      {calculateProgress === 100 ? (
        <PostBlockPointsReveal></PostBlockPointsReveal>
      ) : (
        renderedItems
      )}
    </Wrapper>
  );
}
export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  min-width: 300px;
  width: 100%;
  max-width: 1000px;

  @media ${device.mobileL} {
    min-height: 800px;
  }
`;

const Item = styled.div`
  scroll-padding: 100px;
  scroll-margin: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
  border-radius: 4px;
  width: 100%;

  @media ${device.mobileL} {
    height: 100vh;
    min-height: 800px;
    scroll-margin: 8vh;
    max-height: 1100px;
  }
`;

const Wrapper = styled.div`
  // // padding: 4px;
  // display: flex;
  // flex-direction: column;
  // // align-items: center;
  // // position: absolute;
`;

const PortableTextWrapper = styled.div`
  margin: 5px;
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
