import React, { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../createclient";
import styled from "styled-components";

//   types: {
//     image: (props) => <h4>{JSON.stringify(props.value.asset)}</h4>,

//   },

function TextandImage() {
  const [data, setData] = useState({});

  let content_from_api = "text_test";
  let content_name = "light_microscopes";

  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source) {
    return builder.image(source);
  }

  // const urlFor = (source) =>
  //   imageUrlBuilder({ projectID: "bkqykpjz", dataset: "production" }).image(
  //     source
  //   );

  const myPortableTextComponents = {
    types: {
      image: (props) => (
        <div style={{ borderRadius: "16px" }}>
          {" "}
          <img src={urlFor(props.value.asset)} alt="hjshdjs" />
        </div>
      ),
    },
  };

  // const style = {
  //   height: "50%",
  //   width: "50%",
  //   border: "5px solid",
  //   backgroundColor: "green",
  //   display: "flex",
  //   justifyContent: "center",
  //   borderRadius: "10px",
  //   boxShadow: "10px 5px 5px",
  // };

  useEffect(() => {
    sanityClient
      .fetch(
        `  * [_type == '${content_from_api}' && name == '${content_name}' ] `
      )
      .then((result) => setData(result[0]))
      .catch(console.error);
  }, []);

  const block1 = data.textblock1;
  const block2 = data.textblock2;

  return (
    <div>
      <Box>
        <PortableText
          components={myPortableTextComponents}
          value={block1}
        ></PortableText>
        <PortableText
          components={myPortableTextComponents}
          value={block2}
        ></PortableText>
      </Box>
    </div>
  );
}

export default TextandImage;

const Box = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  border: 2px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  h1 h2 {
    color: red;
  }

  div {
    // height: 20%;
    // width: 10%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;
