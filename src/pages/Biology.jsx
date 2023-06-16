import "../App.css";
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../createclient";
import styled from "styled-components";
import MCQ from "../components/MCQ/MCQ";
import StudentInputForm from "../components/SingleStudentInput/StudentInputForm";
import ClickIncorrectWord from "../components/ClickIncorrectWord/ClickIncorrectWord";
import SliderSelection from "../components/SliderSelection/SliderSelection";
import SliderSelectionRandomise from "../components/SliderSelection/SliderSelectionRandomise";
import DragandDropWrapper from "../components/Drag&Drop/DragandDropWrapper";
import ContinueBtn from "../components/Buttons/ContinueBtn";

function Biology() {
  const [data, setData] = useState({});

  const builder = imageUrlBuilder(sanityClient);

  function imgurlFor(source) {
    return builder.image(source);
  }

  const myPortableTextComponents = {
    types: {
      image: (props) => (
        <div>
          {" "}
          <img src={imgurlFor(props.value.asset).width(400)} alt="hjshdjs" />
        </div>
      ),
      marks: {
        // Ex. 1: custom renderer for the em / italics decorator
        em: ({ children }) => (
          <em className="text-gray-600 font-semibold">{children}</em>
        ),
      },
    },
  };

  let content_from_api = "biology_blocks";
  let content_name = "photosynthesis_required_practical";

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "biology_blocks" && name == "photosynthesis_required_practical" ] 
        { subject_skills[]->, slider, 
          click_incorrect_words_main_text_body,incorrect_words_from_text, order_items_drag_drop, 
                    name, tags, textblock1, textblock2, hint, problem_keywords[]->,  example_problem, MCQ_INPUTS, student_input_test_question, teacher_feedback_comment, acceptable_answers
                    }`
      )
      .then((result) => setData(result[0]))
      .catch(console.error);
  }, []);

  const block1 = data.textblock1;
  const block2 = data.textblock2;
  const skills = data.subject_skills;
  const problem_keywords = data.problem_keywords;
  const tags = data.tags;
  const mcq1 = data.MCQ_INPUTS;
  const order_items_drag_drop = data.order_items_drag_drop;
  const slider = data.slider;

  const click_incorrect_words_text_body =
    data.click_incorrect_words_main_text_body;

  const click_incorrect_words_text = data.incorrect_words_from_text;

  const [item0displayed, setitemOdisplayed] = useState(true);
  const [item1displayed, setitem1displayed] = useState(false);
  const [item2displayed, setitem2displayed] = useState(false);
  const [item3displayed, setitem3displayed] = useState(false);
  const [item4displayed, setitem4displayed] = useState(false);
  const [item5displayed, setitem5displayed] = useState(false);

  const item1listRef = useRef(null);
  const item2listRef = useRef(null);
  const item3listRef = useRef(null);
  const item4listRef = useRef(null);
  const item5listRef = useRef(null);

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
    }, 100);
  };

  const item0 = (
    <Item0>
      <PortableText
        value={block1}
        components={myPortableTextComponents}
      ></PortableText>
      <ContinueBtn
        onClick={() => {
          setitem1displayed(true);
          handleContinueBtnClicked(item1listRef);
        }}
      />
    </Item0>
  );

  const item1 = (
    <Item1 ref={item1listRef}>
      <MCQ data={mcq1}></MCQ>
      <ContinueBtn
        onClick={() => {
          setitem2displayed(true);
          handleContinueBtnClicked(item2listRef);
        }}
      />
    </Item1>
  );

  const item2 = (
    <Item2 ref={item2listRef}>
      <StudentInputForm data={data} />
      <ContinueBtn
        onClick={() => {
          setitem3displayed(true);
          handleContinueBtnClicked(item3listRef);
        }}
      />
    </Item2>
  );

  const item3 = (
    <Item3 ref={item3listRef}>
      <SliderSelection slider={slider} />
      <ContinueBtn
        onClick={() => {
          setitem4displayed(true);
          handleContinueBtnClicked(item4listRef);
        }}
      />
    </Item3>
  );

  const item4 = (
    <Item4 ref={item4listRef}>
      <DragandDropWrapper
        order_items_drag_drop={order_items_drag_drop}
      ></DragandDropWrapper>
      <ContinueBtn
        onClick={() => {
          setitem5displayed(true);
          handleContinueBtnClicked(item5listRef);
        }}
      />
    </Item4>
  );

  if (item0displayed) {
    content.push(item0);
  }
  if (item1displayed) {
    content.push(item1);
  }
  if (item2displayed) {
    content.push(item2);
  }
  if (item3displayed) {
    content.push(item3);
  }
  if (item4displayed) {
    content.push(item4);
  }

  return (
    <Wrapper>
      <h1>Biology</h1>
      {content}
    </Wrapper>
  );
}
export default Biology;

const Item0 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Item1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Item2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Item3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Item4 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
