import React, { useEffect, useState } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { colors, correctstyle, incorrectstyle } from "../../../styles/colors";
import { TableFillMissingValuesContext } from "./FillMissingValuesContext";
import "animate.css";
import ScoreMissingTableValues from "../../scores/ScoreMissingTableValues";

function FillMissingValuesTable(props) {
  const [data, setData] = useState({});
  const [predictvalue, setPredictedValue] = useState("");
  const [calculatedvalue, setCalculatedValue] = useState();
  const [anomalieselected, setAnomalieSelected] = useState(false);
  const [anomalieStyle, setAnomalieStyle] = useState([]);
  const [correctcalculatedvalue, setCorrectCalculateValue] = useState(0);
  const [calculatedValueStyle, setcalculatedValueStyle] = useState({});

  const [inputstyle, setInputStyle] = useState([]);

  // states in context
  const [index0AnswerisCorrect, setindex0AnswerisCorrect] = useState(false);
  const [index0AnswerisInCorrect, setindex0AnswerisInCorrect] = useState(false);
  const [index1AnswerisCorrect, setindex1AnswerisCorrect] = useState(false);
  const [index1AnswerisInCorrect, setindex1AnswerisInCorrect] = useState(false);

  const contextObj = {
    index0AnswerisCorrect,
    setindex0AnswerisCorrect,
    index0AnswerisInCorrect,
    setindex0AnswerisInCorrect,
    index1AnswerisCorrect,
    setindex1AnswerisCorrect,
    index1AnswerisInCorrect,
    setindex1AnswerisInCorrect,
  };

  const grapharr = props.data;

  const calculate_valueHandler = (e) => {
    setCalculatedValue(e.target.value);
  };

  useEffect(() => {
    if (calculatedvalue === correctcalculatedvalue) {
      setcalculatedValueStyle((val) => correctstyle);
      setindex0AnswerisCorrect((val) => true);
      setInputStyle({
        transition: "0.3s",
        color: "white",
        fontWeight: "600",
        textAlign: "center",
        borderRadius: "0px",
        border: "none",
        padding: "0px",
        width: "100%",
        outline: "none",
        backgroundColor: colors.correctColor,
      });
    } else {
      setcalculatedValueStyle((val) => incorrectstyle);
      setInputStyle({
        transition: "0.3s",
        fontWeight: "400",
        textAlign: "center",
        borderRadius: "0px",
        border: "none",
        padding: "0px",
        width: "100%",
        outline: "none",
        backgroundColor: colors.incorrectColor,
      });
    }
  }, [calculatedvalue]);

  const select_anomalieHandler = () => {
    setAnomalieSelected(true);
  };

  useEffect(() => {
    if (anomalieselected) {
      setindex1AnswerisCorrect((val) => true);
      setAnomalieStyle({
        transition: "0.3s",
        color: "white",
        fontWeight: "600",
        textAlign: "center",
        borderRadius: "0px",
        border: "none",
        padding: "0px",
        outline: "none",
        backgroundColor: colors.correctColor,
      });
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
          <div>
            <TableFillMissingValuesContext.Provider value={contextObj}>
              <Main key={item._key}>
                <ScoreMissingTableValues
                  index={index}
                ></ScoreMissingTableValues>
                <p
                  style={{
                    padding: "50px 10px 10px 10px",
                    textAlign: "center",
                  }}
                >
                  {item.question}
                </p>

                {parse(item.html_string, {
                  replace: (domNode) => {
                    if (
                      domNode.attribs &&
                      domNode.attribs.id === "predict_value"
                    ) {
                      return (
                        <td>
                          <Input placeholder="?" type="text"></Input>
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
                            style={inputstyle}
                            placeholder="?"
                            type="text"
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
                      domNode.attribs.id === "select_anaomalie"
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
  // padding-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // position: relative;
`;

const Input = styled.input`
transition: "0.5s",
fontWeight: "bold",
textAlign: "center",
borderRadius: "0px",
border: "none",
padding: "0px",
width: "100%",
outline: "none",`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Anomalie = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
