import "../App.css";
import React, { useState, useEffect, useRef } from "react";
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

function Maths() {
  const [data, setData] = useState({});

  const dispatch = useDispatch();

  let content_from_api = "maths_blocks";
  let content_name = "test_1";
  // let content_name = "kinetic_energy";

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "${content_from_api}" && name == "${content_name}" ] 
        { subject_skills[]->, slider, incorrect_words_from_text, order_items_drag_drop, 
                    name, tags, textblock1, textblock2, textblock3, textblock4,textblock5,  hint, problem_keywords[]->,  example_problem, MCQ_INPUTS, MCQ_MATH_INPUTS,  student_text_input, gap_fill, incorrect_words_from_text, table, line_graph_data, 
                    standard_tables,standard_table_variable_names 
                    }`
      )
      .then((result) => setData(result[0]))
      .catch(console.error);
  }, []);

  const slideShowDataArr = [
    data.textblock1,
    data.textblock2,
    data.textblock3,
    data.textblock4,
    data.textblock5,
  ];

  const skills = data.subject_skills;
  const problem_keywords = data.problem_keywords;
  const tags = data.tags;
  const mcq = data.MCQ_INPUTS;
  const order_items_drag_drop = data.order_items_drag_drop;
  const slider = data.slider;
  const gap_fill = data.gap_fill;
  const incorrect_words_from_text = data.incorrect_words_from_text;
  const standard_table_variable_names = data.standard_table_variable_names;
  const standard_tables = data.standard_tables;
  const student_text_input = data.student_text_input;
  const table = data.table;
  const line_graph_data = data.line_graph_data;

  // slide show
  let item0displayed = true;
  // // quiz components
  const [item1displayed, setItem1displayed] = useState(false);
  const [item2displayed, setItem2displayed] = useState(false);
  const [item3displayed, setItem3displayed] = useState(false);
  const [item4displayed, setItem4displayed] = useState(false);
  const [item5displayed, setItem5displayed] = useState(false);
  const [item6displayed, setItem6displayed] = useState(false);
  const [item7displayed, setItem7displayed] = useState(false);
  const [item8displayed, setItem8displayed] = useState(false);
  const [item9displayed, setItem9displayed] = useState(false);
  const [item10displayed, setItem10displayed] = useState(false);
  const [item11displayed, setItem11displayed] = useState(false);
  const [item12displayed, setItem12displayed] = useState(false);

  const item1listRef = useRef(null);
  const item2listRef = useRef(null);
  const item3listRef = useRef(null);
  const item4listRef = useRef(null);
  const item5listRef = useRef(null);
  const item6listRef = useRef(null);
  const item7listRef = useRef(null);
  const item8listRef = useRef(null);
  const item9listRef = useRef(null);
  const item10listRef = useRef(null);
  const item11listRef = useRef(null);
  const item12listRef = useRef(null);

  // obj where each value represents a value of displayed of not

  let content = [];

  const scrolltoFn = (elementRef) => {
    elementRef.current?.scrollIntoView({
      alignToTop: true,
      behavior: "smooth",
    });
  };

  const handleContinueBtnClicked = (elementRef) => {
    setTimeout(() => {
      scrolltoFn(elementRef);
    }, 50);
  };

  const item0 = (
    <Item>
      <Container style={{ marginTop: "40px" }}>
        <TextSlideShowWrapper
          length={slideShowDataArr.length}
          data={slideShowDataArr}
        ></TextSlideShowWrapper>
      </Container>
    </Item>
  );

  let startQuiz = useSelector(
    (state) => state.currentblockprogressdata.startQuiz
  );

  // let startQuiz = true;

  // TO D0: remove useEffect

  useEffect(() => {
    if (startQuiz) {
      setItem1displayed((val) => true);
      handleContinueBtnClicked(item1listRef);
    }
  }, [startQuiz]);

  const item1 = (
    <Item ref={item1listRef}>
      <Container>
        <MCQ data={mcq}></MCQ>
        <ContinueBtn
          onClick={() => {
            setItem2displayed((val) => true);
            handleContinueBtnClicked(item2listRef);
          }}
        />
      </Container>
    </Item>
  );

  const item2 = (
    <Item ref={item2listRef}>
      <Container>
        <DragandDropWrapper data={order_items_drag_drop} />
        <ContinueBtn
          onClick={() => {
            setItem3displayed((val) => true);
            handleContinueBtnClicked(item3listRef);
          }}
        />
      </Container>
    </Item>
  );

  const item3 = (
    <Item ref={item3listRef}>
      <Container>
        <DualBoxSelectionWrapper slider={slider} />
        <ContinueBtn
          onClick={() => {
            setItem4displayed((val) => true);
            handleContinueBtnClicked(item4listRef);
          }}
        />
      </Container>
    </Item>
  );

  const item4 = (
    <Item ref={item4listRef}>
      <Container>
        <DragandDropWrapper
          order_items_drag_drop={order_items_drag_drop}
        ></DragandDropWrapper>
        <ContinueBtn
          onClick={() => {
            setItem5displayed((val) => true);
            handleContinueBtnClicked(item5listRef);
          }}
        />
      </Container>
    </Item>
  );

  const item5 = (
    <Item ref={item5listRef}>
      <Container>
        <GapFillWrapper data={gap_fill}></GapFillWrapper>
        <ContinueBtn
          onClick={() => {
            setItem6displayed((val) => true);
            handleContinueBtnClicked(item6listRef);
          }}
        />
      </Container>
    </Item>
  );

  const item6 = (
    <Item ref={item6listRef}>
      <Container>
        <IncorrectWordWrapper
          data={incorrect_words_from_text}
        ></IncorrectWordWrapper>

        <ContinueBtn
          onClick={() => {
            setItem7displayed((val) => true);
            handleContinueBtnClicked(item7listRef);
          }}
        />
      </Container>
    </Item>
  );

  const item7 = (
    <Item ref={item7listRef}>
      <Container>
        <FillMissingValuesTable data={table}></FillMissingValuesTable>
        <ContinueBtn
          onClick={() => {
            setItem8displayed((val) => true);
            handleContinueBtnClicked(item8listRef);
          }}
        />
      </Container>
    </Item>
  );
  const item8 = (
    <Item ref={item8listRef}>
      <Container>
        <LineChart data={line_graph_data}></LineChart>
        <ContinueBtn
          onClick={() => {
            setItem9displayed((val) => true);
            handleContinueBtnClicked(item9listRef);
            console.log("ITEM 8 CLICKED");
          }}
        />
      </Container>
    </Item>
  );

  const item9 = (
    <Item ref={item9listRef}>
      <Container>
        <div style={{}}>
          <LargeTable
            standard_tables={standard_tables}
            standard_table_variable_names={standard_table_variable_names}
          ></LargeTable>
          <Scatter
            standard_tables={standard_tables}
            standard_table_variable_names={standard_table_variable_names}
          ></Scatter>
          <ContinueBtn
            onClick={() => {
              setItem10displayed((val) => true);
              handleContinueBtnClicked(item10listRef);
            }}
          />
        </div>
      </Container>
    </Item>
  );

  const item10 = (
    <Item ref={item10listRef}>
      <Container>
        <MovingSliderWrapper data={slider} />
        <ContinueBtn
          onClick={() => {
            setItem11displayed((val) => true);
            handleContinueBtnClicked(item11listRef);
            console.log("ITEM 10 CLICKED");
          }}
        />
      </Container>
    </Item>
  );

  // const item11 = (
  //   <Item ref={item11listRef}>
  //     <Container>
  //       <MovingSliderWrapper data={slider} />
  //       <ContinueBtn
  //         onClick={() => {
  //           setItem12displayed((val) => true);
  //           handleContinueBtnClicked(item12listRef);
  //           console.log("ITEM 10 CLICKED");
  //         }}
  //       />
  //     </Container>
  //   </Item>
  // );

  const itemlist = [
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    item7,
    item8,
    item9,
    item10,
    // item11,
  ];

  let displayedArr = [
    item0displayed,
    item1displayed,
    item2displayed,
    item3displayed,
    item4displayed,
    item5displayed,
    item6displayed,
    item7displayed,
    item8displayed,
    item9displayed,
    item10displayed,
    item11displayed,
    item12displayed,
  ];

  displayedArr.forEach((item, i) => {
    if (item) {
      content.push(itemlist[i]);
    }
  });

  // calculate current poistion in text Slideshow
  let getPositionofSlideShow = useSelector(
    (state) => state.currentblockprogressdata.currentSlide
  );

  let slideShowLength = useSelector(
    (state) => state.currentblockprogressdata.slideNumber
  );

  let totalLengthofCourse = itemlist.length + slideShowLength;

  let currentPositioninCourse = content.length + getPositionofSlideShow;

  // calculating length of component list and pass to context for access to the progress bar

  let blockCompleted = false;

  let calculateProgress = (currentPositioninCourse / totalLengthofCourse) * 100;

  dispatch(updateProgressPercentage({ payload: { calculateProgress } }));
  if (calculateProgress === 100) {
    // course finished
    blockCompleted = true;
    dispatch(updateBlockCompleted());
  }

  return (
    <Wrapper>
      {content}
      {blockCompleted && <PostBlockPointsReveal></PostBlockPointsReveal>}
    </Wrapper>
  );
}
export default Maths;

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
