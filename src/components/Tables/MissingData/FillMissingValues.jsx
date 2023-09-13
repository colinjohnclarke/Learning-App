import React, { useEffect, useState } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { colors, correctstyle, incorrectstyle } from "../../../styles/colors";
import { TableFillMissingValuesContext } from "./FillMissingValuesContext";
import "animate.css";
import ScoreMissingTableValues from "../../Data/CurrentQuestionScores/ScoreMissingTableValues";

function FillMissingValuesTable(props) {
  const totalMarksAvailable = props.total_marks_available;

  const [data, setData] = useState({});
  const [predictedvalue, setPredictedValue] = useState("");
  const [predictedvaluerange, setPredictedValueRange] = useState([]);
  const [predictedValueStyle, setPredictedValueStyle] = useState({});
  const [predictedvalueiscorrect, setPredictedValueIsCorrect] = useState(false);
  const [predictedinputstyle, setpredictedInputStyle] = useState({});

  const [calculatedvalue, setCalculatedValue] = useState();
  const [anomalieselected, setAnomalieSelected] = useState(false);
  const [anomalieStyle, setAnomalieStyle] = useState([]);
  const [correctcalculatedvalue, setCorrectCalculateValue] = useState(0);
  const [calculatedValueStyle, setcalculatedValueStyle] = useState({});

  const [calculatedinputstyle, setCalculatedInputStyle] = useState([]);

  // states in context
  const [index0AnswerisCorrect, setindex0AnswerisCorrect] = useState(false);
  const [index0AnswerisInCorrect, setindex0AnswerisInCorrect] = useState(false);
  const [index1AnswerisCorrect, setindex1AnswerisCorrect] = useState(false);
  const [index1AnswerisInCorrect, setindex1AnswerisInCorrect] = useState(false);
  const [index2AnswerisCorrect, setindex2AnswerisCorrect] = useState(false);
  const [index2AnswerisInCorrect, setindex2AnswerisInCorrect] = useState(false);

  const contextObj = {
    index0AnswerisCorrect,
    setindex0AnswerisCorrect,
    index0AnswerisInCorrect,
    setindex0AnswerisInCorrect,
    index1AnswerisCorrect,
    setindex1AnswerisCorrect,
    index1AnswerisInCorrect,
    setindex1AnswerisInCorrect,
    index2AnswerisCorrect,
    setindex2AnswerisCorrect,
    index2AnswerisInCorrect,
    setindex2AnswerisInCorrect,
  };

  const grapharr = props.data;

  const calculate_valueHandler = (e) => {
    setCalculatedValue(e.target.value);
  };

  const correctstyle = {
    transition: "0.3s",
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    borderRadius: "0px",
    backgroundColor: colors.correctColor,
  };

  const incorrectstyle = {
    transition: "0.3s",
    fontWeight: "400",
    textAlign: "center",
    borderRadius: "0px",
    border: "none",
    padding: "0px",
    outline: "none",
    backgroundColor: colors.incorrectColor,
  };

  useEffect(() => {
    if (calculatedvalue === correctcalculatedvalue) {
      setcalculatedValueStyle((val) => correctstyle);
      setindex0AnswerisCorrect((val) => true);
      setCalculatedInputStyle((val) => correctstyle);
    } else {
      setcalculatedValueStyle((val) => incorrectstyle);
      setCalculatedInputStyle((val) => incorrectstyle);
    }
  }, [calculatedvalue]);

  const predictedValueHandler = (e) => {
    setPredictedValue(e.target.value);
  };

  useEffect(() => {
    if (
      predictedvalue >= predictedvaluerange[0] &&
      predictedvalue <= predictedvaluerange[1]
    ) {
      setindex2AnswerisCorrect((val) => true);
      setPredictedValueIsCorrect((val) => true);
      setpredictedInputStyle((val) => correctstyle);
      setPredictedValueStyle((val) => correctstyle);
    } else {
      setpredictedInputStyle((val) => incorrectstyle);
      setPredictedValueStyle((val) => incorrectstyle);
    }
  }, [predictedvalue]);

  const select_anomalieHandler = () => {
    setAnomalieSelected(true);
  };

  useEffect(() => {
    if (anomalieselected) {
      setindex1AnswerisCorrect((val) => true);
      setAnomalieStyle((val) => correctstyle);
    } else {
      setAnomalieStyle({
        transition: "0.3s",
        textAlign: "center",
        borderRadius: "0px",
        border: "none",
        padding: "0px",
        // width: "100%",
        outline: "none",
      });
    }
  }, [anomalieselected]);

  return (
    <Wrapper>
      {grapharr?.map((item, index) => {
        return (
          <div style={{ width: "100%" }}>
            <TableFillMissingValuesContext.Provider value={contextObj}>
              <Main key={item._key}>
                <ScoreMissingTableValues
                  totalMarksAvailable={totalMarksAvailable}
                  index={index}
                ></ScoreMissingTableValues>
                <Question
                  style={{
                    padding: "50px 10px 10px 10px",
                    textAlign: "center",
                  }}
                >
                  {item.question}
                </Question>

                {parse(item.html_string, {
                  replace: (domNode) => {
                    if (
                      domNode.attribs &&
                      domNode.attribs.id === "predict_value"
                    ) {
                      return (
                        <td style={predictedValueStyle}>
                          <Input
                            onChange={(e) => {
                              predictedValueHandler(e);

                              if (item.predicted_value_range) {
                                setPredictedValueRange((val) =>
                                  item.predicted_value_range.split("-")
                                );
                              }
                            }}
                            style={predictedinputstyle}
                            maxLength="5"
                            placeholder="?"
                            type="text"
                          ></Input>
                        </td>
                      );
                    }

                    if (
                      domNode.attribs &&
                      domNode.attribs.id === "calculate_value"
                    ) {
                      return (
                        <td style={calculatedValueStyle}>
                          <Input
                            className={
                              index0AnswerisCorrect
                                ? "animate__animated animate__rubberBand"
                                : "animate__animated"
                            }
                            style={calculatedinputstyle}
                            placeholder="?"
                            type="text"
                            maxLength="5"
                            onChange={(e) => {
                              calculate_valueHandler(e);
                              setCorrectCalculateValue(
                                item.correct_expected_answers
                              );
                            }}
                          ></Input>
                        </td>
                      );
                    }
                    if (
                      domNode.attribs &&
                      domNode.attribs.id === "select_anomaly"
                    ) {
                      return (
                        <td style={anomalieStyle}>
                          <Anomalie
                            className={
                              index1AnswerisCorrect
                                ? "animate__animated animate__rubberBand"
                                : "animate__animated"
                            }
                            style={anomalieStyle}
                            placeholder="?"
                            maxLength="5"
                            type="text"
                            onClick={select_anomalieHandler}
                          >
                            {item.correct_expected_answers}
                          </Anomalie>
                        </td>
                      );
                    }
                  },
                })}
              </Main>
            </TableFillMissingValuesContext.Provider>
          </div>
        );
      })}
    </Wrapper>
  );
}

export default FillMissingValuesTable;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  transition: 0.5s;
  fontweight: bold;
  textalign: center;
  borderradius: 0px;
  border: none;
  padding: 0px;
  width: 100%;
  outline: none;
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
