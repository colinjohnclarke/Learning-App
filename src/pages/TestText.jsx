// import React from "react";
// import { useState, useEffect } from "react";

// import { PortableText } from "@portabletext/react";
// import text from "./text.json";
// import urlBuilder from "@sanity/image-url";
// // import { client } from "../../../createclient";
// import imageUrlBuilder from "@sanity/image-url";



// function TestText() {
//   const [data, setData] = useState();

//   let content_from_api = "text_test";

//   useEffect(() => {
//     getdata();
//   }, []);

//   const getdata = async () => {
//     const url = `https://bkqykpjz.api.sanity.io/v2021-10-21/data/query/production?query=*%20%5B_type%20%3D%3D%20'${content_from_api}'%20%5D%20%0A`;

//     const response = await test_api(url);

//     setData(response);
//   };



//   // function blocksToText(blocks) {
//   //   return blocks.map((block) =>
//   //     block.children.map((child) => child.text).join("")
//   //   );
//   // }

//   return (
//     <div>
//       <h1>TEXT TEST</h1>

//       {/* <PortableText value={text.textblock1} /> */}

//       {/* <pre>{JSON.stringify(text.textblock1, null, 1)}</pre> */}

//       <p>
//         <h2>String data</h2>?
//       </p>
//     </div>
//   );
// }

// export default TestText;
