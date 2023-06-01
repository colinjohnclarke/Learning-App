import React from "react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import styled from "styled-components";

function ClickIncorrectWord(props) {
  // get Data from props
  const click_incorrect_words_text_body = props.click_incorrect_words_text_body;

  function blocksToText(blocks) {
    return blocks?.map((block) =>
      block.children.map((child) => child.text).join("")
    );
  }

  const getinfp = blocksToText(click_incorrect_words_text_body);

  console.log(getinfp);

  const click_incorrect_words_text = props.click_incorrect_words_text;

  const builder = imageUrlBuilder(sanityClient);

  function imgurlFor(source) {
    return builder.image(source);
  }

  const myPortableTextComponents = {
    types: {
      image: (props) => (
        <div className="imagetest">
          <img src={imgurlFor(props.value.asset).width(600)} alt="" />
        </div>
      ),
      incorrect: (props) => {
        <div className="test">
          <del />
        </div>;
      },
    },
  };

  return (
    <Wrapper>
      <PortableText
        value={click_incorrect_words_text_body}
        components={myPortableTextComponents}
      ></PortableText>
    </Wrapper>
  );
}

export default ClickIncorrectWord;

const Wrapper = styled.div`
  font-size: 1rem;
`;
