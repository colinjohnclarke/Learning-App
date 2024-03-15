import React, { useContext } from "react";
import styled from "styled-components";
import { rankData } from "./LeaderBoardRankData";
import "animate.css";
import { device } from "../../../styles/breakpoints";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { UserContext } from "../../../App";
import { useGetTop10SchoolXPQuery } from "../../../redux/api/UserData/SchoolData/schoolXPoints";

function SchoolLeaderBoard() {
  const { darkThemeActive } = useContext(UserContext);

  const { data } = useGetTop10SchoolXPQuery();

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
          {data?.getSchoolXpoints.map((item, index) => {
            const borderBottomStyle =
              index === 2
                ? `1px solid ${ThemeStyles.highlightPrimaryColor}`
                : `0px solid ${ThemeStyles.highlightTertiaryColor}`;

            let rankElement = <></>;

            if (rankData[index].display) {
              rankElement = (
                <img
                  style={{ height: "30px" }}
                  src={rankData[index].display}
                  alt={rankData[index].position}
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
                  <P>{rankData[index].position}</P>
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
                src={rankData[index].cartoonImg}
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
                        justifyContent: "space-between",
                        height: "40px",
                        width: "100%",
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

                      <Location>
                        {" "}
                        {item.town}, {item.postcode}
                      </Location>
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
                  <P darkThemeActive={darkThemeActive}>{item.totalXP}</P>
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
  border-radius: 5px;
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
