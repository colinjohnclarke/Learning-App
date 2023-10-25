import React from "react";
import styled from "styled-components";
import { LeaderBoardFakeData } from "./StudentLeaderBoardFakeData";
import { rankData } from "./LeaderBoardRankData";
import { device } from "../../../styles/breakpoints";

function StudentLeaderBoard() {
  // console.log("NOT RANKED", LeaderBoardFakeData);
  LeaderBoardFakeData.sort(function (a, b) {
    return b.xp - a.xp;
  });

  const data = rankData;

  return (
    <Wrapper>
      <Main>
        <thead>
          <tr>
            <Rank style={{ position: "relative", right: "14.7%" }}>Rank</Rank>
            <TableHead>School</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Xp</TableHead>
          </tr>
        </thead>

        {/* <img style={{ height: "30px" }} alt="" src={x}></img> */}

        <TableBody>
          {LeaderBoardFakeData.map((item, index) => {
            let rankElement = <></>;

            if (data[index].display) {
              rankElement = (
                <img
                  style={{
                    height: "30px",
                    position: "relative",
                    right: "1.3%",
                  }}
                  src={data[index].display}
                  alt={data[index].position}
                />
              );
            } else {
              rankElement = (
                <div
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 1px 0px",
                    position: "relative",
                    right: "1.3%",
                  }}
                >
                  {data[index].position}
                </div>
              );
            }

            const gifElement = (
              <GifImg
                style={{
                  height: "50px",
                  width: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 1px 1px 0px",
                  maxWidth: "100px",
                  maxHeight: "100px",
                  // display: "none",
                }}
                alt={data[index].position}
                src={data[index].gif}
              ></GifImg>
            );

            const borderBottomStyle =
              index === 2
                ? "2px solid rgba(0, 200, 200, 0.5)"
                : "0.5px solid rgba(200, 200, 200, 0.5)";

            return (
              <tr>
                <Td
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                    fontWeight: "700",
                    borderBottom: borderBottomStyle,
                  }}
                >
                  {rankElement}

                  {gifElement}
                </Td>
                <Td style={{ borderBottom: borderBottomStyle }}>
                  {item.school}
                </Td>
                <Td style={{ borderBottom: borderBottomStyle }}>
                  <p
                    style={{
                      fontWeight: "500",
                      fontSize: "10px",
                    }}
                  >
                    {item.name}
                  </p>
                </Td>
                <Td
                  style={{
                    fontWeight: "700",
                    fontSize: "10px",
                    color: "darkblue",
                    borderBottom: borderBottomStyle,
                  }}
                >
                  {item.xp}
                </Td>
              </tr>
            );
          })}
        </TableBody>
      </Main>
    </Wrapper>
  );
}
// <tr style={{ border: "1px solid" }}>
//         <td>test</td>
//         <td>test</td>
//         <td>test</td>
//         <td>test</td>
//       </tr>
//       <tr>
//         <td>test</td>
//         <td>test</td>
//         <td>test</td>
//         <td>test</td>
//       </tr>
export default StudentLeaderBoard;

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
`;

const Main = styled.table`
  width: 100%;
  text-align: center;
  font-size: 12px;
`;

const TableHead = styled.th`
  font-weight: 500;
`;

const Rank = styled.th`
  padding: 10px;
  width: 50%;
  font-weight: 500;
`;

const TableBody = styled.tbody`
  border: 1px solid;
`;
// const Td = styled.td`
//   border-bottom: 0.5px solid lightgrey;
//   font-size: 10px;
// `;

const GifImg = styled.img``;

const Td = styled.td`
  // border-bottom: 0.5px solid lightgrey;
  ]font-size: 10px;
`;
