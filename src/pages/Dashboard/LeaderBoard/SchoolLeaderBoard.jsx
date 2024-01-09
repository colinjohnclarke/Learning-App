import React, { useContext } from "react";
import styled from "styled-components";
import { schoolLeaderBoardFakeData } from "./SchoolLeaderBoardFakeData";
import { rankData } from "./LeaderBoardRankData";
import "animate.css";
import { device } from "../../../styles/breakpoints";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { UserContext } from "../../../App";

function SchoolLeaderBoard() {
  const { darkThemeActive } = useContext(UserContext);

  schoolLeaderBoardFakeData.sort(function (a, b) {
    return b.xp - a.xp;
  });

  const data = rankData;

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <Main darkThemeActive={darkThemeActive}>
        <TableHead darkThemeActive={darkThemeActive}>
          <Tr darkThemeActive={darkThemeActive}>
            <Rank darkThemeActive={darkThemeActive}>Rank</Rank>
            <School darkThemeActive={darkThemeActive}>School</School>
            <Xp darkThemeActive={darkThemeActive}>Xp</Xp>
          </Tr>
        </TableHead>

        <TableBody darkThemeActive={darkThemeActive}>
          {schoolLeaderBoardFakeData.map((item, index) => {
            const borderBottomStyle =
              index === 2
                ? `1px solid ${ThemeStyles.highlightPrimaryColor}`
                : `0px solid ${ThemeStyles.highlightTertiaryColor}`;

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
                  darkThemeActive={darkThemeActive}
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: darkThemeActive
                      ? ThemeStyles.lightThemePrimaryBackgroundColor
                      : ThemeStyles.darkThemePrimaryBackgroundColor,

                    boxShadow: darkThemeActive
                      ? `${ThemeStyles.lightThemeMainBoxShadow}, rgba(0, 0, 0, 0.15) 0px 3px 1px 0px`
                      : `${ThemeStyles.darkThemeMainBoxShadow}, rgba(0, 0, 0, 0.15) 0px 3px 1px 0px`,
                  }}
                >
                  <P>{data[index].position}</P>
                </div>
              );
            }

            const cartoon = (
              <img
                alt=""
                style={{
                  height: "30px",
                  width: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                src={item.cartoonImg}
              ></img>
            );

            return (
              <Tr
                darkThemeActive={darkThemeActive}
                className=" animate__animated animate__fadeIn"
                style={{
                  animationDelay: `${index / 20}s`,
                }}
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
                </Td>

                <Td style={{ borderBottom: borderBottomStyle }}>
                  <SchoolDetails darkThemeActive={darkThemeActive}>
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
                      <P
                        darkThemeActive={darkThemeActive}
                        style={{
                          fontWeight: "500",
                          fontSize: "13px",
                          height: "0px",
                        }}
                      >
                        {item.name}
                      </P>

                      <Location> {item.location}</Location>
                    </div>

                    <div style={{ paddingRight: "20px" }}> {cartoon}</div>
                  </SchoolDetails>
                </Td>
                <Td
                  darkThemeActive={darkThemeActive}
                  style={{
                    borderBottom: borderBottomStyle,
                  }}
                >
                  <P darkThemeActive={darkThemeActive}>{item.xp}</P>
                </Td>
              </Tr>
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
  border-radius: 5px;
  border: none;
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

const TableHead = styled.thead`
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Tr = styled.tr`
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Xp = styled.th`
  padding: 10px;
  width: 35%;
  min-width: 60px;
  font-weight: 500;
  font-size: 15px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const P = styled.p`
  font-size: 13px;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const Rank = styled.th`
  padding: 10px;
  width: 20%;
  font-weight: 500;
  font-size: 15px;
  border: none;


  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
}

`;

const School = styled.th`
  padding: 10px;
  width: 100%;
  font-weight: 500;
  font-size: 15px;
  text-align: left;
  border: none;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const SchoolDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: none;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  p {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  @media ${device.mobileL} {
    justify-content: space-around;
    justify-content: center;
    align-items: center;
  }
`;

const TableBody = styled.tbody`
  border: none;
`;

const Td = styled.td`
  height: 50px;
  font-size: 13px;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
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
