import React from "react";
import { PortableText } from "@portabletext/react";
import { myPortableTextComponents } from "../../config/sanity/portableText";

import BlockText from "../../config/sanity/BlockText";

function TextSectionDesktop({
  data,
  index,
  length,
  currentslide,
  setCurrentSlide,
}) {
  let translateStartPosition = index * 100;

  translateStartPosition = (index - currentslide) * 100;

  if (currentslide === length) {
    setCurrentSlide((s) => 0);
  }

  return (
    <div
      style={{
        position: "absolute",
        paddingTop: "20px",
        width: "100%",
        height: "700px",
        transition: "0.5s",
        transform: `translateX(${translateStartPosition}%)`,
      }}
      onClick={() => {
        setCurrentSlide((s) => s + 1);
      }}
    >
      {/* <PortableText
        value={data}
        components={myPortableTextComponents}
      ></PortableText> */}

      <BlockText data={data}></BlockText>
    </div>
  );
}

export default TextSectionDesktop;
