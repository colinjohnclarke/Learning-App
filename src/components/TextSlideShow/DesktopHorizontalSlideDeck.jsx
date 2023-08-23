import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";

function DesktopHorizontalSlideDeck(props) {
  const data = props.data;
  console.log(
    "🚀 ~ file: DesktopHorizontalSlideDeck.jsx:5 ~ MobileViewDropDown ~ data:",
    data
  );

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
    <div>
      <PortableText
        value={data}
        components={myPortableTextComponents}
      ></PortableText>
    </div>
  );
}

export default DesktopHorizontalSlideDeck;
