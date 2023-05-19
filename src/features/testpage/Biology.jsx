import React, { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import styled from "styled-components";

function Biology() {
  const [data, setData] = useState({});

  let content_from_api = "biology_blocks";
  let content_name = "photosynthesis_required_practical";

  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source) {
    return builder.image(source);
  }

  const myPortableTextComponents = {
    types: {
      image: (props) => (
        <div>
          {" "}
          <img src={urlFor(props.value.asset).width(400)} alt="hjshdjs" />
        </div>
      ),
    },
  };

  useEffect(() => {
    sanityClient
      .fetch(
        `  * [_type == '${content_from_api}' && name == '${content_name}' ] `
      )
      .then((result) => setData(result[0]))
      .catch(console.error);
  }, []);

  const block1 = data.textblock1;
  // console.log("🚀 ~ file: Biology.jsx:42 ~ Biology ~ block1:", block1);
  const block2 = data.textblock2;
  // console.log("🚀 ~ file: Biology.jsx:44 ~ Biology ~ block2:", block2);
  const block3 = data.textblock3;
  // console.log("🚀 ~ file: Biology.jsx:46 ~ Biology ~ block3:", block3);
  const skills = data.skills;
  // console.log("🚀 ~ file: Biology.jsx:48 ~ Biology ~ skills:", skills);
  const tags = data.tags;
  // console.log("🚀 ~ file: Biology.jsx:50 ~ Biology ~ tags:", tags);
  const mcq = data.MCQ[0];
  // console.log("🚀 ~ file: Biology.jsx:52 ~ Biology ~ mcq:", mcq);
  const example_problem = data.example_problem;
  // console.log(
  //   "🚀 ~ file: Biology.jsx:52 ~ Biology ~ example_problem:",
  //   example_problem
  // );

  return (
    <div>
      <h1>Biology</h1>
      {/* text blocks  */}
      <PortableText
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
    </div>
  );
}
export default Biology;
