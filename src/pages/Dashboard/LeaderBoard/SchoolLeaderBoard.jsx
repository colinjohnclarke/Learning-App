import React from "react";
import styled from "styled-components";
import { schoolLeaderBoardFakeData } from "./SchoolLeaderBoardFakeData";
import { rankData } from "./LeaderBoardRankData";
import "animate.css";
import { device } from "../../../styles/breakpoints";

function SchoolLeaderBoard() {
  schoolLeaderBoardFakeData.sort(function (a, b) {
    return b.xp - a.xp;
  });

  const data = rankData;

  return (
    <Wrapper>
      <Main>
        <thead>
          <tr>
            <Rank>Rank</Rank>
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
            const borderBottomStyle =
              index === 2
                ? "2px solid rgba(0, 200, 200, 0.5)"
                : "0.5px solid rgba(200, 200, 200, 0.5)";

            return (
              <tr
                className=" animate__animated animate__fadeIn"
                style={{
                  animationDelay: `${index / 20}s`,
                  backgroundColor: "white",
                }}
              >
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
                </Td>

                <Td style={{ borderBottom: borderBottomStyle }}>
                  <SchoolDetails>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                        // justifyContent: "space-around",
                        height: "40px",
                        width: "100%",
                        // width: "250px",
                        // padding: "5px",
                        // border: "1px solid green",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "500",
                          fontSize: "13px",
                          height: "0px",
                        }}
                      >
                        {item.name}
                      </p>

                      <Location>{item.location}</Location>
                    </div>

                    <div style={{ paddingRight: "20px" }}> {cartoon}</div>
                  </SchoolDetails>
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

export default SchoolLeaderBoard;

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
`;

const Main = styled.table`
  width: 100%;
  text-align: center;
  font-size: 13px;
`;

const TableHead = styled.th`
  padding: 10px;
  width: 35%;
  min-width: 60px;
  font-weight: 500;
  font-size: 15px;
`;

const Rank = styled.th`
  padding: 10px;
  width: 20%;
  font-weight: 500;
  font-size: 15px;
`;

const School = styled.th`
  padding: 10px;
  width: 100%;
  font-weight: 500;
  font-size: 15px;
  text-align: left;
`;

const SchoolDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media ${device.mobileL} {
    justify-content: space-around;
    justify-content: center;
    align-items: center;
  }
`;

const TableBody = styled.tbody``;

const Td = styled.td`
  font-size: 13px;
  height: 50px;
`;

const Location = styled.p`
  font-weight: 200;
  font-size: 11px;
  display: none;
  justify-content: start;
  width: 200px;

  @media ${device.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
