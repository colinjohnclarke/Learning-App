import React, { useContext } from "react";
import styled from "styled-components";

import { rankData } from "./LeaderBoardRankData";
import { device } from "../../../styles/breakpoints";
import { useGetTop10UsersQuery } from "../../../redux/api/UserData/userDataSlice";
import "animate.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { UserContext } from "../../../App";

function StudentLeaderBoard() {
  const { darkThemeActive } = useContext(UserContext);

  const { data, error, isLoading } = useGetTop10UsersQuery();

  const newArr = data ? [...data] : [];

  const filterUsersWithNoXP = newArr.filter((user) => user.totalXP);

  const sorted = filterUsersWithNoXP?.sort((a, b) => b.totalXP - a.totalXP);

  const mainContent = (
    <Main darkThemeActive={darkThemeActive}>
      <thead>
        <Tr darkThemeActive={darkThemeActive}>
          <Rank
            darkThemeActive={darkThemeActive}
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

      <TableBody darkThemeActive={darkThemeActive}>
        {sorted?.map((item, index) => {
          let rankElement = <></>;

          const borderBottomStyle =
            index === 2
              ? `1px solid ${ThemeStyles.highlightPrimaryColor}`
              : `0px solid ${ThemeStyles.highlightTertiaryColor}`;

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

          return (
            <Tr
              darkThemeActive={darkThemeActive}
              style={{
                animationDelay: `${index / 20}s`,
              }}
              className=" animate__animated animate__fadeIn"
            >
              <Td
                darkThemeActive={darkThemeActive}
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

              <Td
                darkThemeActive={darkThemeActive}
                style={{ borderBottom: borderBottomStyle }}
              >
                {/* <p
                  style={{
                    fontWeight: "600",
                    fontSize: "13px",
                    color: "blue",
                    textAlign: "left",
                  }}
                > */}
                {item.firstName ? (
                  <span>
                    {item.firstName} {item.lastName}
                  </span>
                ) : (
                  <span>{item.email}</span>
                )}
                {/* </p> */}
              </Td>
              <Td
                darkThemeActive={darkThemeActive}
                style={{
                  fontWeight: "700",
                  fontSize: "13px",
                  width: "100px",
                  borderBottom: borderBottomStyle,
                }}
              >
                <p>{item.totalXP}</p>
              </Td>
              <Td
                darkThemeActive={darkThemeActive}
                style={{ borderBottom: borderBottomStyle }}
              >
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
    <Wrapper darkThemeActive={darkThemeActive}>
      {isLoading ? <Skeleton height={60} count={10} /> : mainContent}
    </Wrapper>
  );
}

export default StudentLeaderBoard;

const Wrapper = styled.div`
  width: 100%;

  border-radius: 5px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
`;

const Main = styled.table`
  border: none;
  width: 100%;
  text-align: center;
  font-size: 12px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const TableHead = styled.th`
  font-weight: 500;
  font-size: 15px;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const Rank = styled.th`
  padding: 10px;
  width: 20%;
  font-weight: 500;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  @media ${device.mobileL} {
    width: 30%;
  }
`;

const TableBody = styled.tbody`
  // border: 1px solid;
  border: collapse;
`;

const GifImg = styled.img``;

const Td = styled.td`
  min-height: 70px;

  p,
  span {
    font-size: 13px;
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;

const Tr = styled.tr`
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Gif = styled.div`
  display: none;

  @media ${device.mobileL} {
    display: flex;
  }
`;
