import React from "react";
import styled from "styled-components";
import { schoolLeaderBoardFakeData } from "./SchoolLeaderBoardFakeData";
import { rankData } from "./LeaderBoardRankData";

function SchoolLeaderBoard() {
  schoolLeaderBoardFakeData.sort(function (a, b) {
    return b.xp - a.xp;
  });

  console.log(schoolLeaderBoardFakeData);
  const data = rankData;

  let thirdplaceborder = "0.5";

  return (
    <Wrapper>
      <Main>
        <thead>
          <tr>
            <Rank>Rank</Rank>
            {/* <TableHead>Student</TableHead> */}
            <School>School</School>
            <TableHead>Xp</TableHead>
          </tr>
        </thead>

        <TableBody>
          {schoolLeaderBoardFakeData.map((item, index) => {
            let rankElement = <></>;

            if (data[index].display) {
              rankElement = (
                <img
                  style={{ height: "30px" }}
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
                  }}
                >
                  {data[index].position}
                </div>
              );
            }

            const cartoon = (
              <img
                alt=""
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "00%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                src={item.cartoonImg}
              ></img>
            );

            const Td = styled.td`
              border-bottom: ${thirdplaceborder}px solid lightgrey;
              font-size: 10px;
              height: 50px;
            `;

            if (index === 1) {
              thirdplaceborder = "3";
            } else thirdplaceborder = "0.5";

            return (
              <tr>
                <Td
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                    fontWeight: "700",
                  }}
                >
                  {rankElement}
                </Td>

                <Td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "center",
                        height: "30px",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "500",
                          fontSize: "10px",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontWeight: "200",
                          fontSize: "10px",
                        }}
                      >
                        {item.location}
                      </p>
                    </div>

                    <div style={{ paddingRight: "30px" }}> {cartoon}</div>
                  </div>
                </Td>
                <Td
                  style={{
                    fontWeight: "700",
                    fontSize: "10px",
                    color: "darkblue",
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

export default SchoolLeaderBoard;

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
  padding: 10px;
  width: 25%;
  font-weight: 500;
`;

const Rank = styled.th`
  padding: 10px;
  width: 20%;
  font-weight: 500;
`;

const School = styled.th`
  padding: 10px;
  width: 70%;
  font-weight: 500;
`;

const TableBody = styled.tbody``;

const GifImg = styled.img``;

// const Td = styled.td`
//   border-bottom: 2px solid lightgrey;
//   font-size: 10px;
//   height: 50px;
// `;
