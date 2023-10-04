import React, { useEffect } from "react";
import styled from "styled-components";
import sanityClient from "../../createclient";
import DOMPurify from "dompurify";
import imageUrlBuilder from "@sanity/image-url";
import { fontWeight } from "@mui/system";

function BlockText({ data }) {
  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  useEffect(() => {
    // mathJax added to index HTML head
    //we need to tell MathJax to typeset the mathematics once it has been inserted into the page. We can use the MathJax.typeset() or MathJax.typesetPromise() functions for this.By calling the MathJax.typeset() function inside a useEffect, our latex can be rendered properly when a component re-render occurs.

    if (typeof window?.MathJax !== "undefined") {
      window.MathJax.typeset();
    }
  }, []);

  let dataBlock = [];

  if (data) {
    dataBlock = data.map((item) => {
      const { _type, body, children, style, listItem, markDefs, asset } = item;
      return {
        _type,
        algebra: body,
        text: children,
        style,
        listItem,
        markDefs,
        asset,
      };
    });
  }

  let content = [];

  if (dataBlock) {
    content = dataBlock.map((item) => {
      const { algebra, text, style, listItem, _type, asset } = item;

      if (
        text &&
        !listItem &&
        !text.some((subItem) => subItem.marks.includes("strong"))
      ) {
        // check to seee what style has been asigned and make new approprate element

        const textContent = text.map((item) => item.text);

        if (style.startsWith("h")) {
          const headingLevel = Number(style.slice(1));
          return React.createElement(`h${headingLevel}`, null, textContent);
        }

        return <p>{textContent}</p>;
      } else if (
        Array.isArray(text) &&
        !listItem &&
        (text.some((subItem) => subItem.marks.includes("strong")) ||
          text.some((subItem) => subItem.marks.includes("underline")) ||
          text.some((subItem) => subItem.marks.includes("em")))
      ) {
        const textblock = text.map((item) => {
          if (item.marks.includes("strong")) {
            return (
              <strong style={{ fontWeight: "500", display: "inline" }}>
                {item.text}
              </strong>
            );
          } else if (item.marks.includes("underline")) {
            return (
              <p style={{ display: "inline", textDecoration: "underline" }}>
                {item.text}
              </p>
            );
          } else if (item.marks.includes("em")) {
            return (
              <p style={{ display: "inline", fontStyle: "italic" }}>
                {item.text}
              </p>
            );
          } else {
            return <p style={{ display: "inline" }}>{item.text}</p>;
          }
        });

        return <p>{textblock}</p>;
      } else if (listItem === "number") {
        const numberedElements = text.map((item, index) => {
          if (item.marks.includes("strong")) {
            return (
              <strong style={{ fontWeight: "500", display: "inline" }}>
                {item.text}
              </strong>
            );
          } else if (item.marks.includes("underline")) {
            return (
              <p style={{ display: "inline", textDecoration: "underline" }}>
                {item.text}
              </p>
            );
          } else if (item.marks.includes("em")) {
            return (
              <p style={{ display: "inline", fontStyle: "italic" }}>
                {item.text}
              </p>
            );
          } else {
            return <p style={{ display: "inline" }}>{item.text}</p>;
          }
        });

        return <li>{numberedElements}</li>;
      } else if (
        listItem === "bullet" &&
        !text.some((subItem) => subItem.marks.includes("strong"))
      ) {
        // make list from bullet marks

        return <li>{text.map((item) => item.text)}</li>;
      } else if (
        Array.isArray(text) &&
        listItem === "bullet" &&
        text.some((subItem) => subItem.marks.includes("strong"))
      ) {
        const text2 = text.map((item) => {
          if (item.marks.some((subItem) => subItem.includes("strong"))) {
            return (
              <strong
                style={{
                  fontWeight: "500",
                  display: "inline",
                }}
              >
                {item.text}
              </strong>
            );
          } else
            return (
              <p
                style={{
                  display: "inline",
                }}
              >
                {item.text}
              </p>
            );
        });

        return <li>{text2}</li>;

        
      } else if (algebra) {
        // if alebgra then render xml maths
        const cleaned = DOMPurify.sanitize(algebra);
        return (
          <h2
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
            }}
            dangerouslySetInnerHTML={{ __html: cleaned }}
          ></h2>
        );
      } else if (_type === "image") {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt=""
              style={{ width: "350px" }}
              src={imgurlFor(asset._ref)}
            ></img>
          </div>
        );
      } else return null;
    });
  }

  return <Wrapper>{content}</Wrapper>;
}

export default BlockText;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  text-align: left;
`;
