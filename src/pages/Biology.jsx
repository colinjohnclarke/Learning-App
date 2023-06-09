import "../App.css";
import React, { useState, useEffect } from "react";
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

  return (
    <Wrapper>
      <h1>Biology</h1>
      {/* <PortableText
        value={block1}
        components={myPortableTextComponents}
      ></PortableText>
      <PortableText
        value={block2}
        components={myPortableTextComponents}
      ></PortableText>
      <div>
        <h1>Keywords: </h1>
        <ol>
          {problem_keywords?.map((keyword) => {
            return <li> {keyword.keyword}</li>;
          })}
        </ol>
      </div>
      <PortableText
        value={tags}
        components={myPortableTextComponents}
      ></PortableText>
      <h1>Skills: </h1>
      <div>
        {skills?.map((skill) => {
          return (
            <div>
              <p>{skill.skill_name}</p>
            </div>
          );
        })}
      </div>
      <MCQ data={mcq1}></MCQ>
      <StudentInputForm data={data} /> */}
      <ClickIncorrectWord
        click_incorrect_words_text={click_incorrect_words_text}
        click_incorrect_words_text_body={click_incorrect_words_text_body}
      />
      <SliderSelection slider={slider} />
      <DragandDropWrapper
        order_items_drag_drop={order_items_drag_drop}
      ></DragandDropWrapper>
    </Wrapper>
  );
}
export default Biology;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(245, 250, 255);
  color: rgb(40, 40, 40);
`;
