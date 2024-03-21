import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { colors } from "../../../styles/colors";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { UserContext } from "../../../App";
import "animate.css";
import Score from "../../Data/CurrentQuestionScores/Score";

function FillMissingValuesTable({ data }) {
  const [correctAnswerIsSelected, setCorrectAnswerIsSelected] = useState(false);
  const [predictedvaluerange, setPredictedValueRange] = useState([]);
  const [predictedValue, setPredictedValue] = useState("");
  const [expectedAnswers, setExpectedAnswers] = useState([]);
  const [animateClass, setAnimateClass] = useState("");
  const [style, setStyle] = useState({
    transition: "0.3s",
    textAlign: "center",
    borderRadius: "0px",
    // border: "none",
    padding: "0px",
    // outline: "none",
    // borderRight: "none",
    // bnorderBottom: "none",
  });

  const { darkThemeActive } = useContext(UserContext);

  const [boxStyle, setBoxStyle] = useState({});

  const correctStyle = {
    transition: "0.3s",
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: colors.correctColor,
  };

  const correctBoxStyle = {
    transition: "0.3s",
    // color: "white",
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: colors.correctColor,
  };

  const incorrectStyle = {
    transition: "0.3s",
    fontWeight: "400",
    textAlign: "center",
    borderRadius: "0px",
    padding: "0px",
    outline: "none",
    backgroundColor: colors.incorrectColor,
  };

  const tableTypes = [
    { value: "select_anomaly" },
    { value: "predict_value" },
    { value: "calculate_value" },
  ];

  const calculateValueHandler = (e) => {
    if (e.target.value === expectedAnswers) {
      setCorrectAnswerIsSelected((val) => true);
      setStyle((val) => correctStyle);
      setBoxStyle((val) => correctBoxStyle);
    } else {
      setStyle((val) => incorrectStyle);
      setBoxStyle((val) => incorrectStyle);
    }
  };

  useEffect(() => {
    if (!predictedValue) {
      setStyle((val) => ({
        textAlign: "center",
      }));
      setBoxStyle((val) => {});
    } else if (
      predictedValue >= predictedvaluerange[0] &&
      predictedValue <= predictedvaluerange[1] &&
      predictedValue
    ) {
      setCorrectAnswerIsSelected((val) => true);
      setStyle((val) => correctStyle);
      setBoxStyle((val) => correctBoxStyle);
      setAnimateClass((val) => "animate__animated animate__rubberBand");
    } else {
      setStyle((val) => incorrectStyle);
      setBoxStyle((val) => incorrectStyle);
    }
  }, [predictedValue]);

  const anomalySelectedHandler = () => {
    setCorrectAnswerIsSelected((val) => true);
    setStyle((val) => correctStyle);
    setBoxStyle((val) => correctBoxStyle);
  };

  return (
    <Wrapper>
      {data?.map((item, index) => {
        return (
          <div style={{ width: "100%" }}>
            <Main key={item._key}>
              <Score
                scoreData={{
                  correctAnswerIsSelected,
                }}
                totalMarksAvailable={item.total_marks_available}
                index={index}
              ></Score>
              <Question
                style={{
                  padding: "50px 10px 10px 10px",
                  textAlign: "center",
                }}
              >
                {item.question}
              </Question>
              {/* predict Value */}
              <Table darkThemeActive={darkThemeActive}>
                {parse(item.html_string, {
                  replace: (domNode) => {
                    if (
                      domNode.attribs &&
                      domNode.attribs.id === tableTypes[1].value
                    ) {
                      return (
                        <td style={boxStyle}>
                          <Input
                            onChange={(e) => {
                              setPredictedValue((val) => e.target.value);
                              setPredictedValueRange((val) =>
                                item.predicted_value_range.split("-")
                              );
                            }}
                            style={style}
                            maxLength="3"
                            placeholder="?"
                            type="text"
                          ></Input>
                        </td>
                      );
                    }
                    //  calculate value
                    if (
                      domNode.attribs &&
                      domNode.attribs.id === tableTypes[2].value
                    ) {
                      return (
                        <td style={boxStyle}>
                          <Input
                            className={animateClass}
                            style={style}
                            placeholder="?"
                            type="text"
                            maxLength="5"
                            onChange={(e) => {
                              calculateValueHandler(e);
                              setExpectedAnswers(
                                (val) => item.correct_expected_answers
                              );
                            }}
                          ></Input>
                        </td>
                      );
                    }

                    // selected anomaly //
                    if (
                      domNode.attribs &&
                      domNode.attribs.id === tableTypes[0].value
                    ) {
                      return (
                        <td style={boxStyle}>
                          <Anomalie
                            // className={
                            //   index1AnswerisCorrect
                            //     ? "animate__animated animate__rubberBand"
                            //     : "animate__animated"
                            // }
                            className={animateClass}
                            style={style}
                            placeholder="?"
                            maxLength="5"
                            type="text"
                            onClick={anomalySelectedHandler}
                          >
                            {item.correct_expected_answers}
                          </Anomalie>
                        </td>
                      );
                    } else return undefined;
                  },
                })}
              </Table>
            </Main>
          </div>
        );
      })}
    </Wrapper>
  );
}

export default React.memo(FillMissingValuesTable);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  min-height: 500px;
`;

const Input = styled.input`
  transition: 0.5s;
  fontweight: bold;
  textalign: center;
  border: none;
  padding: 0px;
  width: 100%;
  outline: none;
`;

const Table = styled.div`
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeTertiaryBackgroundColor};

  * {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

const Anomalie = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Question = styled.div`
  font-weight: 400;
`;

const td = styled.td``;
