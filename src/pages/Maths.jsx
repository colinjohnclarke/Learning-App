import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sanityClient from "../createclient";
import DOMPurify from "dompurify";
import { PortableText } from "@portabletext/react";
import { myPortableTextComponents } from "../config/sanity/portableText";
import imageUrlBuilder from "@sanity/image-url";
import { GiClawHammer } from "react-icons/gi";

function Maths() {
  const [data, setData] = useState();
  console.log("🚀 ~ file: Maths.jsx:10 ~ Maths ~ data:", data);

  const builder = imageUrlBuilder(sanityClient);
  console.log("🚀 ~ file: Maths.jsx:15 ~ Maths ~ builder:", builder);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  console.log(imgurlFor);

  // const myPortableTextComponents = {
  //   types: {
  //     image: (props) => (
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <img src={imgurlFor(props.value.asset).width(300)} alt="" />
  //       </div>
  //     ),
  //     marks: {
  //       // Ex. 1: custom renderer for the em / italics decorator
  //       em: ({ children }) => (
  //         <em className="text-gray-600 font-semibold">{children}</em>
  //       ),
  //     },
  //   },
  // };

  console.log(data);
  let content_from_api = "algebra";
  let content_name = "test";

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "algebra"]`)
      .then((result) => setData(result[0]))
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   sanityClient
  //     .fetch(`*[_type == "${content_from_api}" && name == "${content_name}" ]`)
  //     .then((result) => setData(result[0]))
  //     .catch(console.error);
  // }, []);

  useEffect(() => {
    // mathJax added to index HTML head
    //we need to tell MathJax to typeset the mathematics once it has been inserted into the page. We can use the MathJax.typeset() or MathJax.typesetPromise() functions for this.By calling the MathJax.typeset() function inside a useEffect, our latex can be rendered properly when a component re-render occurs.

    if (typeof window?.MathJax !== "undefined") {
      window.MathJax.typeset();
    }
  }, []);

  let dataBlock = [];

  if (data) {
    dataBlock = data.textblock1.map((item) => {
      const { _type, body, children, style, listItem, markDefs } = item;
      return {
        _type,
        algebra: body,
        text: children,
        style,
        listItem,
        markDefs,
      };
    });
  }

  let content = [];

  console.log("dataBlock", dataBlock);

  if (dataBlock) {
    content = dataBlock.map((item) => {
      const { algebra, text, style, listItem, _type } = item;

      if (text && !listItem) {
        // check to seee what style has been asigned and make new approprate element
        let generatedElement = null;
        const textContent = text.map((item) => item.text);

        if (style.startsWith("h")) {
          const headingLevel = Number(style.slice(1));
          return React.createElement(`h${headingLevel}`, null, textContent);
        }

        return <p>{textContent}</p>;
      } else if (
        listItem === "bullet" &&
        !text.some((subItem) => subItem.marks.includes("strong"))
      ) {
        // make list from bullet marks

        return <li>{text.map((item) => item.text)}</li>;
      } else if (
        // checking to see if there are strong marks and add strong tags
        Array.isArray(text) &&
        text.some((subItem) => subItem.marks.includes("strong")) &&
        listItem !== "bullet"
      ) {
        const text1 = text.map((item) => {
          if (item.marks.some((subItem) => subItem.includes("strong"))) {
            return (
              <strong style={{ fontWeight: "500", display: "inline" }}>
                {item.text}
              </strong>
            );
          } else return <p style={{ display: "inline" }}>{item.text}</p>;
        });
        return <div>{text1}</div>;
      } else if (
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
            style={{ fontSize: "1.5rem", textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: cleaned }}
          ></h2>
        );
      }

      // else if (_type === "image") {
      //   return (

      //   );
      // }
      else return null;
    });
  }

  console.log("CONTENT", content);

  return <Wrapper>{content}</Wrapper>;
}

export default Maths;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 30px;
  margin: 10px;
`;
