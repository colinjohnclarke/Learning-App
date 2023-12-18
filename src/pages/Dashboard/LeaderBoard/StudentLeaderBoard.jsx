import React, { useEffect } from "react";
import styled from "styled-components";
import { LeaderBoardFakeData } from "./StudentLeaderBoardFakeData";
import { rankData } from "./LeaderBoardRankData";
import { device } from "../../../styles/breakpoints";
import { useGetTop10UsersQuery } from "../../../features/api/UserData/userDataSlice";
import "animate.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function StudentLeaderBoard() {
  // console.log(useGetTop10UsersQuery);

  const { data, error, isLoading } = useGetTop10UsersQuery();

  const newArr = data ? [...data] : [];

  const filtered = data ? newArr?.sort((a, b) => b.totalXP - a.totalXP) : [];

  const mainContent = (
    <Main>
      <thead>
        <Tr>
          <Rank
            style={{
              position: "relative",
              // right: "14.7%",
              fontWeight: "500",
              fontSize: "15px",
            }}
          >
            Rank
          </Rank>
          <TableHead>Student</TableHead>
          <TableHead>Xp</TableHead>
          <TableHead>School</TableHead>
        </Tr>
      </thead>

      <TableBody>
        {filtered?.map((item, index) => {
          let rankElement = <></>;

          if (rankData[index].display) {
            rankElement = (
              <img
                style={{
                  height: "30px",
                  position: "relative",
                  right: "1.3%",
                }}
                src={rankData[index].display}
                alt={rankData[index].position}
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
                {rankData[index].position}
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
              alt={rankData[index].position}
              src={rankData[index].gif}
            ></GifImg>
          );

          const borderBottomStyle =
            index === 2
              ? "2px solid rgba(0, 200, 200, 0.5)"
              : "0.5px solid rgba(200, 200, 200, 0.5)";

          return (
            <Tr
              style={{
                animationDelay: `${index / 20}s`,
                backgroundColor: "white",
              }}
              className=" animate__animated animate__fadeIn"
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

                <Gif>{gifElement}</Gif>
              </Td>

              <Td style={{ borderBottom: borderBottomStyle }}>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "13px",
                    color: "blue",
                    textAlign: "left",
                  }}
                >
                  {item.firstName ? (
                    <span>
                      {item.firstName} {item.lastName}
                    </span>
                  ) : (
                    <span>{item.email}</span>
                  )}
                </p>
              </Td>
              <Td
                style={{
                  fontWeight: "700",
                  fontSize: "13px",
                  color: "darkblue",
                  width: "100px",
                  borderBottom: borderBottomStyle,
                }}
              >
                {item.totalXP}
              </Td>
              <Td style={{ borderBottom: borderBottomStyle }}>
                <p
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {item.schoolName}
                </p>
              </Td>
            </Tr>
          );
        })}
      </TableBody>
    </Main>
  );

  return (
    <Wrapper>
      {isLoading ? <Skeleton height={60} count={10} /> : mainContent}
    </Wrapper>
  );
}

export default StudentLeaderBoard;

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
`;

const Main = styled.table`
  width: 100%;
  text-align: center;
  font-size: 12px;
`;

const TableHead = styled.th`
  font-weight: 500;
  font-size: 15px;
`;

const Rank = styled.th`
  padding: 10px;
  width: 20%;
  font-weight: 500;

  @media ${device.mobileL} {
    width: 30%;
  }
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
  min-height: 70px;
`;

const Tr = styled.tr``;

const Gif = styled.div`
  display: none;

  @media ${device.mobileL} {
    display: flex;
  }
`;
