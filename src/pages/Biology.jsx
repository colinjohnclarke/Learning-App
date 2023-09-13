import "../App.css";
import React, { useState, useEffect, useRef } from "react";
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

function Biology() {
  const [data, setData] = useState({});
  const [blockcompleted, setBlockCompleted] = useState(false);

  // const builder = imageUrlBuilder(sanityClient);

  const dispatch = useDispatch();

  // function imgurlFor(source) {
  //   return builder.image(source);
  // }

  // const myPortableTextComponents = {
  //   types: {
  //     image: (props) => (
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <img src={imgurlFor(props.value.asset).width(300)} alt="" />
  //       </div>
  //     ),
  //     marks: {
  //       // Ex. 1: custom renderer for the em / italics decorator
  //       em: ({ children }) => (
  //         <em className="text-gray-600 font-semibold">{children}</em>
  //       ),
  //     },
  //   },
  // };

  let content_from_api = "biology_blocks";
  let content_name = "photosynthesis_required_practical";
  // let content_name = "kinetic_energy";

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "${content_from_api}" && name == "${content_name}" ] 
        { subject_skills[]->, slider, incorrect_words_from_text, order_items_drag_drop, 
                    name, tags, textblock1, textblock2, textblock3, textblock4,textblock5,  hint, problem_keywords[]->,  example_problem, MCQ_INPUTS, student_text_input, gap_fill, incorrect_words_from_text, table, line_graph_data, 
                    standard_tables,standard_table_variable_names 
                    }`
      )
      .then((result) => setData(result[0]))
      .catch(console.error);
  }, []);

  const block1 = data.textblock1;
  const block2 = data.textblock2;
  const block3 = data.textblock3;
  const block4 = data.textblock4;
  const block5 = data.textblock5;
  const slideShowDataArr = [block1, block2, block3, block4, block5];

  const skills = data.subject_skills;
  const problem_keywords = data.problem_keywords;
  const tags = data.tags;
  const mcq1 = data.MCQ_INPUTS;
  const order_items_drag_drop = data.order_items_drag_drop;
  const slider = data.slider;
  const gap_fill = data.gap_fill;
  const incorrect_words_from_text = data.incorrect_words_from_text;
  const standard_table_variable_names = data.standard_table_variable_names;
  const standard_tables = data.standard_tables;

  const student_text_input = data.student_text_input;

  const table = data.table;

  const line_graph_data = data.line_graph_data;

  const [item0displayed, setitemOdisplayed] = useState(true);
  const [item1displayed, setitem1displayed] = useState(false);
  const [item2displayed, setitem2displayed] = useState(false);
  const [item3displayed, setitem3displayed] = useState(false);
  const [item4displayed, setitem4displayed] = useState(false);
  const [item5displayed, setitem5displayed] = useState(false);
  const [item6displayed, setitem6displayed] = useState(false);
  const [item7displayed, setitem7displayed] = useState(false);
  const [item8displayed, setitem8displayed] = useState(false);
  const [item9displayed, setitem9displayed] = useState(false);
  const [item10displayed, setitem10displayed] = useState(false);
  const [item11displayed, setitem11displayed] = useState(false);
  const [item12displayed, setitem12displayed] = useState(false);

  const displayedArr = [
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

  const startQuiz = useSelector(
    (state) => state.textslideshowslice.completedTextSlideShow
  );

  useEffect(() => {
    if (startQuiz) {
      setitem1displayed(true);
      handleContinueBtnClicked(item1listRef);
    } else {
      setitem1displayed(false);
    }
  }, [startQuiz]);

  const item1 = (
    <Item ref={item1listRef}>
      <Container>
        <MCQ data={mcq1}></MCQ>

        <ContinueBtn
          onClick={() => {
            setitem2displayed(true);
            handleContinueBtnClicked(item2listRef);
          }}
        />
      </Container>
    </Item>
  );

  const item2 = (
    <Item ref={item2listRef}>
      <Container>
        <StudentTextInputWrapper data={student_text_input} />
        <ContinueBtn
          onClick={() => {
            setitem3displayed(true);
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
            setitem4displayed(true);
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
            setitem5displayed(true);
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
            setitem6displayed(true);
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
            setitem7displayed(true);
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
            setitem8displayed(true);
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
            setitem9displayed(true);
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
              setitem10displayed(true);
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
            setitem11displayed(true);
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
  //       <ContinueBtn
  //         onClick={() => {
  //           setitem12displayed(true);
  //           handleContinueBtnClicked(item12listRef);
  //           console.log("ITEM 11 CLICKED");
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

  displayedArr.forEach((item, i) => {
    if (item) {
      content.push(itemlist[i]);
    }
  });

  // calculate current poistion in text Slideshow
  let getPositionofSlideShow = useSelector(
    (state) => state.textslideshowslice.position
  );

  // ensuring the progress bar doesnt reset when Slider Deck returns to 0
  const [position, setPosition] = useState(0);
  const [allSlidesSeen, setAllSlidesSeen] = useState(false);

  useEffect(() => {
    if (getPositionofSlideShow + 1 === slideShowDataArr.length) {
      setAllSlidesSeen((val) => true);
      setPosition((val) => slideShowDataArr.length - 1);
    } else if (
      getPositionofSlideShow < slideShowDataArr.length &&
      !allSlidesSeen
    ) {
      setPosition((val) => getPositionofSlideShow);
    }

    // if (allSlidesSeen) {
    //   setPosition((val) => slideShowDataArr.length - 1);
    // }
  }, [getPositionofSlideShow, allSlidesSeen]);

  let totalLengthofCourse = itemlist.length + slideShowDataArr.length;

  let currentPositioninCourse = content.length + position;

  // calculating length of component list and pass to context for access to the progress bar

  useEffect(() => {
    let calculateProgress =
      (currentPositioninCourse / totalLengthofCourse) * 100;

    dispatch(updateProgressPercentage({ payload: { calculateProgress } }));
    if (calculateProgress === 100) {
      // course finished
      setBlockCompleted((val) => true);
    }
  }, [currentPositioninCourse, totalLengthofCourse]);

  useEffect(() => {
    if (blockcompleted) {
      dispatch(updateBlockCompleted());
      console.log("   dispatch(updateBlockCompleted());");
    }
  }, [blockcompleted]);

  return (
    <Wrapper>
      {content}
      {blockcompleted && <PostBlockPointsReveal></PostBlockPointsReveal>}
    </Wrapper>
  );
}
export default Biology;

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
