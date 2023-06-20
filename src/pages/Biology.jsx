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
import GapFill from "../components/GapFill/GapFill";
import IncorrectWordWrapper from "../components/IncorrectWordIdentifier/IncorrectWordWrapper";

function Biology() {
  const [data, setData] = useState({});

  const builder = imageUrlBuilder(sanityClient);

  function imgurlFor(source) {
    return builder.image(source);
  }

  const myPortableTextComponents = {
    types: {
      image: (props) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={imgurlFor(props.value.asset).width(300)} alt="hjshdjs" />
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
        `*[_type == "${content_from_api}" && name == "${content_name}" ] 
        { subject_skills[]->, slider, 
          click_incorrect_words_main_text_body,incorrect_words_from_text, order_items_drag_drop, 
                    name, tags, textblock1, textblock2, hint, problem_keywords[]->,  example_problem, MCQ_INPUTS, student_input_test_question, teacher_feedback_comment, acceptable_answers, gap_fill, incorrect_words_from_text
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
  const gap_fill = data.gap_fill;

  const incorrect_words_from_text = data.incorrect_words_from_text;

  const [item0displayed, setitemOdisplayed] = useState(true);
  const [item1displayed, setitem1displayed] = useState(false);
  const [item2displayed, setitem2displayed] = useState(false);
  const [item3displayed, setitem3displayed] = useState(false);
  const [item4displayed, setitem4displayed] = useState(false);
  const [item5displayed, setitem5displayed] = useState(false);
  const [item6displayed, setitem6displayed] = useState(false);
  const [item7displayed, setitem7displayed] = useState(false);

  const item1listRef = useRef(null);
  const item2listRef = useRef(null);
  const item3listRef = useRef(null);
  const item4listRef = useRef(null);
  const item5listRef = useRef(null);
  const item6listRef = useRef(null);
  const item7listRef = useRef(null);

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
    <Item>
      <Container>
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
      </Container>
    </Item>
  );

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
        <StudentInputForm data={data} />
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
        <SliderSelection slider={slider} />
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
        <GapFill data={gap_fill}></GapFill>

        <ContinueBtn
          onClick={() => {
            setitem6displayed(true);
            handleContinueBtnClicked(item6listRef);
            console.log("ITEM 5 CLICKED");
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
            setitem6displayed(true);
            handleContinueBtnClicked(item7listRef);
            console.log("ITEM 6 CLICKED");
          }}
        />
      </Container>
    </Item>
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
  if (item5displayed) {
    content.push(item5);
  }
  if (item6displayed) {
    content.push(item6);
  }

  return (
    <Wrapper>
      <h1>Biology</h1>
      {content}
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
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  margin: 5px;
  padding: 15px;
  max-width: 700px;
  min-width: 300px;
  // width: 100%;
`;

const Item = styled.div`
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
