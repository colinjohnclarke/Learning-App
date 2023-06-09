// import React from "react";
// import { useState, useEffect } from "react";

// function Block() {
//   const [data, setData] = useState();

//   let content_from_api = "biology_blocks";

//   useEffect(() => {
//     getdata();
//   }, []);

//   const getdata = async () => {
//     const url = `https://bkqykpjz.api.sanity.io/v2021-10-21/data/query/production?query=*%20%5B_type%20%3D%3D%20'${content_from_api}'%20%5D%20%0A`;

//     const response = await test_api(url);

//     setData(response);
//   };

//   console.log("block data", data);

//   //   return <h1>Block</h1>;

//   return <div></div>;
// }

// export default Block;
