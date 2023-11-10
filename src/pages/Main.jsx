import "../App.css";
import React, { useState, useEffect, useRef, useContext } from "react";
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

function Main() {
  const [data, setData] = useState({});
  console.log("🚀 ~ file: Main.jsx:31 ~ Main ~ data:", data);
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

  const itemData = [
    {
      component: (
        <TextSlideShowWrapper
          length={slideShowDataArr.length}
          data={slideShowDataArr}
        />
      ),
    },
    // {
    //   component: <MCQ data={MCQ_INPUTS} />,
    // },
    // {
    //   component: <StudentTextInputWrapper data={student_text_input} />,
    // },
    // {
    //   component: <DualBoxSelectionWrapper data={slider} />,
    // },
    // {
    //   component: (
    //     <DragandDropWrapper data={order_items_drag_drop}></DragandDropWrapper>
    //   ),
    // },
    {
      component: <GapFillWrapper data={gap_fill}></GapFillWrapper>,
    },
    {
      component: (
        <IncorrectWordWrapper
          data={incorrect_words_from_text}
        ></IncorrectWordWrapper>
      ),
    },
    {
      component: <FillMissingValuesTable data={table}></FillMissingValuesTable>,
    },
    // {
    //   component: <MovingSliderWrapper data={slider} />,
    // },
  ];

  const itemDisplayedInitialState = [
    true,
    ...Array(itemData.length - 1).fill(false),
  ];
  const [itemDisplayed, setItemDisplayed] = useState(itemDisplayedInitialState);

  const displayedItems = itemData.map((item, index) => ({
    component: item.component,
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
    }, 50);
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

  const renderedItems = displayedItems.map(
    (item, index) =>
      item.displayed && (
        <Item ref={itemRefs[index]}>
          <Container>
            {item.component}
            {index < itemData.length && index !== itemData.length - 1 && (
              <ContinueBtn
                onClick={() => handleContinueBtnClicked(index + 1)}
              />
            )}

            {index === itemData.length - 1 && (
              <CheckScoreBtn
                onClick={() => handleContinueBtnClicked(index + 1)}
              />
            )}
          </Container>
        </Item>
      )
  );

  // calculate current poistion in text Slideshow

  let totalLengthofCourse =
    itemData.length + currentblockprogressdata.slideNumber;

  let numOfDisplayedItems = 1;

  displayedItems.forEach((item) => {
    if (item.displayed) {
      numOfDisplayedItems++;
    }
  });

  let currentPositioninCourse =
    numOfDisplayedItems + currentblockprogressdata.currentSlide;
  // calculating length of component list and pass to context for access to the progress bar

  let blockCompleted = false;
  let calculateProgress = (currentPositioninCourse / totalLengthofCourse) * 100;

  dispatch(updateProgressPercentage({ payload: { calculateProgress } }));

  if (calculateProgress === 100) {
    // course finished
    blockCompleted = true;
  }

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
      console.log("updateUserDataFN();");
    }
  }, [blockCompleted]);

  return (
    <Wrapper>
      {renderedItems}
      {blockCompleted && <PostBlockPointsReveal></PostBlockPointsReveal>}
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
`;

const Item = styled.div`
  scroll-padding: 100px;
  scroll-margin: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // position: absolute;
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
