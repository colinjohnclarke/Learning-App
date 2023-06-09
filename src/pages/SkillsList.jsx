// import React from "react";
// import { useState, useEffect } from "react";


// function SkillsList() {
//   const [data, setData] = useState();

//   let content_from_api = "skills";

//   useEffect(() => {
//     getdata();
//   }, []);

//   const getdata = async () => {
//     const url = `https://bkqykpjz.api.sanity.io/v2021-10-21/data/query/production?query=*%20%5B_type%20%3D%3D%20'${content_from_api}'%20%5D%20%0A`;

//     const response = await test_api(url);

//     setData(response);
//   };

//   console.log("skill data", data);

//   return (
//     <div>
//       <h1>Skills</h1>
//       {data?.map((item) => {
//         return (
//           <div key={item.skill_name}>
//             <h2>{item.skill_name}</h2>
//             <p>{item.skill_description}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default SkillsList;
