import React, { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import styled from "styled-components";
import MCQ from "../../components/MCQ/MCQ";
import GetData from "../../components/SingleStudentInput/GetData";

function Biology() {
  const [data, setData] = useState({});

  let content_from_api = "physics_blocks";
  let content_name = "energy";

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

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == '${content_from_api}' && name == '${content_name}'] {
          subject_skills[]->, 
            name, tags, textblock1, textblock2, example_problem, MCQ
            }`
      )
      .then((result) => setData(result[0]))
      .catch(console.error);
  }, []);

  const block1 = data.textblock1;
  const block2 = data.textblock2;
  const block3 = data.textblock3;
  const skills = data.subject_skills;
  const tags = data.tags;
  const mcq1 = data.MCQ;

  const example_problem = data.example_problem;

  const textstyle = {
    height: "auto",
    width: "80%",
    border: "1px solid",
  };

  return (
    <Wrapper>
      <h1>Biology</h1>

      <PortableText
        style={textstyle}
        value={block1}
        components={myPortableTextComponents}
      ></PortableText>
      <PortableText
        value={block2}
        components={myPortableTextComponents}
      ></PortableText>
      <PortableText
        value={block3}
        components={myPortableTextComponents}
      ></PortableText>
      <PortableText
        value={example_problem}
        components={myPortableTextComponents}
      ></PortableText>
      <div>
        <h1>Tags: </h1>
        <ol>
          {tags?.map((element) => {
            return <li> {element}</li>;
          })}
        </ol>
      </div>

      <div>
        <PortableText
          value={tags}
          components={myPortableTextComponents}
        ></PortableText>
      </div>
      <h1>Skills: </h1>
      <div>
        {skills?.map((skill) => {
          return (
            <div>
              <p>{skill.skill_name}</p>
              <p>{skill.skill_description}</p>
            </div>
          );
        })}
        ;
      </div>
      <MCQ data={mcq1}></MCQ>

      <GetData />
    </Wrapper>
  );
}
export default Biology;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1,
  h1,
  h2,
  h3,
  p {
    color: black;
  }
`;
