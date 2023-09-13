import React, { useEffect, useRe, useState } from "react";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import MobileVerticalSlideDeck from "./MobileVeriticalSlideDeck";
import MobileViewDropDown from "./DesktopHorizontalSlideDeck";
import DesktopHorizontalSlideDeck from "./DesktopHorizontalSlideDeck";
import { device } from "../../styles/breakpoints";

function TextSlideShowWrapper(props) {
  const data = props.data;
  const length = props.length;
  const builder = imageUrlBuilder(sanityClient);

  const [screennwidth, setScreenWitdth] = useState();

  const [reloadpage, setReloadPage] = useState(false);

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

  let content;

  if (window.innerWidth < 700) {
    content = (
      <MobileVerticalSlideDeck
        length={length}
        data={data}
      ></MobileVerticalSlideDeck>
    );
  } else {
    content = (
      <DesktopHorizontalSlideDeck data={data}></DesktopHorizontalSlideDeck>
    );
  }

  return <Wrapper>{content}</Wrapper>;
}

export default TextSlideShowWrapper;

const Wrapper = styled.div`
  width: 100vw;
  max-width: 1000px;
  height: auto;
`;
