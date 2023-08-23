import React, { useRef } from "react";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import MobileVerticalSlideDeck from "./MobileVeriticalSlideDeck";
import MobileViewDropDown from "./DesktopHorizontalSlideDeck";

function TextSlideShowWrapper(props) {
  const data = props.data;
  const length = props.length;
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
          <img src={imgurlFor(props.value.asset).width(300)} alt="" />
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

  return (
    <Wrapper>
      <MobileVerticalSlideDeck
        length={length}
        data={data}
      ></MobileVerticalSlideDeck>
      {/* <DesktopViewSlider length={length} data={data}></DesktopViewSlider> */}
    </Wrapper>
  );
}

export default TextSlideShowWrapper;

const Wrapper = styled.div``;
