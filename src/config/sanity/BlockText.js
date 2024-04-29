import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import sanityClient from "../../createclient";
import DOMPurify from "dompurify";
import imageUrlBuilder from "@sanity/image-url";

import Test from "../../components/Geogebra/Test";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";

function BlockText({ data }) {


  const builder = imageUrlBuilder(sanityClient);

  const { darkThemeActive } = useContext(UserContext);

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
        type: _type,
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
      const { algebra, text, style, listItem, type, asset } = item;
      /// CHECK IF CODE MARKS ARE ASSIGNED AND RENDER GEOGEBRA APP
      if (
        text &&
        !listItem &&
        text.some((subItem) => subItem.marks.includes("code"))
      ) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // overflow: "hidden",
            }}
          >
            {" "}
            <Test
              id={text.map((section) => section.text)}
              material_id={text.map((section) => section.text)}
            ></Test>
            ;
          </div>
        );
      } else if (
        text &&
        !listItem &&
        !text.some((subItem) => subItem.marks.includes("strong"))
      ) {
        // check to see what style has been asigned and make new approprate element

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
              <strong
                style={{
                  fontWeight: "500",
                  color: darkThemeActive
                    ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                    : ThemeStyles.darkThemePrimaryFontColor,
                  display: "inline",
                }}
              >
                {item.text}
              </strong>
            );
          } else if (item.marks.includes("underline")) {
            return (
              <p
                style={{
                  display: "inline",
                  textDecoration: "underline",
                  color: darkThemeActive
                    ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                    : ThemeStyles.darkThemePrimaryFontColor,
                }}
              >
                {item.text}
              </p>
            );
          } else if (item.marks.includes("em")) {
            return (
              <p
                style={{
                  display: "inline",
                  fontStyle: "italic",
                  color: darkThemeActive
                    ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                    : ThemeStyles.darkThemePrimaryFontColor,
                }}
              >
                {item.text}
              </p>
            );
          } else {
            return (
              <p
                style={{
                  display: "inline",
                  color: darkThemeActive
                    ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                    : ThemeStyles.darkThemePrimaryFontColor,
                }}
              >
                {item.text}
              </p>
            );
          }
        });

        return (
          <p
            style={{
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            {textblock}
          </p>
        );
      } else if (listItem === "number") {
        const numberedElements = text.map((item, index) => {
          if (item.marks.includes("strong")) {
            return (
              <strong
                style={{
                  fontWeight: "500",
                  display: "inline",
                  color: darkThemeActive
                    ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                    : ThemeStyles.darkThemePrimaryFontColor,
                }}
              >
                {item.text}
              </strong>
            );
          } else if (item.marks.includes("underline")) {
            return (
              <p
                style={{
                  display: "inline",
                  textDecoration: "underline",
                  color: darkThemeActive
                    ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                    : ThemeStyles.darkThemePrimaryFontColor,
                }}
              >
                {item.text}
              </p>
            );
          } else if (item.marks.includes("em")) {
            return (
              <p
                style={{
                  display: "inline",
                  fontStyle: "italic",
                  color: darkThemeActive
                    ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                    : ThemeStyles.darkThemePrimaryFontColor,
                }}
              >
                {item.text}
              </p>
            );
          } else {
            return (
              <p
                style={{
                  display: "inline",
                  color: darkThemeActive
                    ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                    : ThemeStyles.darkThemePrimaryFontColor,
                }}
              >
                {item.text}
              </p>
            );
          }
        });

        return <li>{numberedElements}</li>;
      } else if (
        listItem === "bullet" &&
        !text.some((subItem) => subItem.marks.includes("strong"))
      ) {
        // make list from bullet marks

        return (
          <li
            style={{
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            {text.map((item) => item.text)}
          </li>
        );
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
                  color: darkThemeActive
                    ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                    : ThemeStyles.darkThemePrimaryFontColor,
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
                  color: darkThemeActive
                    ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                    : ThemeStyles.darkThemePrimaryFontColor,
                }}
              >
                {item.text}
              </p>
            );
        });

        return (
          <li
            style={{
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColorThemePrimaryFontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            {text2}
          </li>
        );
      } else if (algebra) {
        // if alebgra then render xml maths
        const cleaned = DOMPurify.sanitize(algebra);
        return (
          <AlgebraDiv darkThemeActive={darkThemeActive} style={{}}>
            {" "}
            <h2
              style={{
                fontSize: "1.8rem",
                textAlign: "center",
              }}
              dangerouslySetInnerHTML={{ __html: cleaned }}
            ></h2>
          </AlgebraDiv>
        );
      } else if (type === "image") {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt=""
              style={{
                width: "auto",
                height: "auto",
                maxHeight: "350px",
                maxWidth: "350px",
              }}
              src={imgurlFor(asset._ref)}
            ></img>
          </div>
        );
      } else return null;
    });
  }

  // const data2 =
  //   "When \\(a \\ne 0\\), there are two solutions to \\(ax^2 + bx + c = 0\\) and they are \\[x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.\\]";

  return content;
}

export default BlockText;

const AlgebraDiv = styled.div`
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor};

  * {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;
