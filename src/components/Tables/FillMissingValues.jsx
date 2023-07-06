import React, { useEffect, useState } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { colors } from "../../styles/colors";
import Score from "../scores/Score";

function FillMissingValuesTable(props) {
  const [data, setData] = useState({});
  const [predictvalue, setPredictedValue] = useState("");
  const [calculatedvalue, setCalculatedValue] = useState();
  const [anomalieselected, setAnomalieSelected] = useState(false);
  const [correctcalculatedvalue, setCorrectCalculateValue] = useState(0);

  let anomalieStyle = {};

  let calculatedValueStyle = {
    backgroundColor: colors.incorrectColor,
  };

  let inputStyle = {
    transition: "0.5s",
    textAlign: "center",
    borderRadius: "0px",
    border: "none",
    padding: "0px",
    width: "100%",
    outline: "none",
    backgroundColor: colors.incorrectColor,
  };

  const grapharr = props.data;

  const calculate_valueHandler = (e) => {
    setCalculatedValue(e.target.value);
  };

  if (calculatedvalue === correctcalculatedvalue) {
    calculatedValueStyle = {
      backgroundColor: colors.correctColor,
    };

    inputStyle = {
      transition: "0.5s",
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: "0px",
      border: "none",
      padding: "0px",
      width: "100%",
      outline: "none",
      backgroundColor: colors.correctColor,
    };
  }

  const select_anomalieHandler = () => {
    setAnomalieSelected(true);
  };

  if (anomalieselected) {
    anomalieStyle = {
      backgroundColor: colors.correctColor,
      fontWeight: "bold",
    };
  }

  return (
    <Wrapper>
      <Score></Score>
      {grapharr?.map((item, index) => {
        return (
          <Main key={item._key}>
            <p style={{ padding: "10px", textAlign: "center" }}>
              {item.question}
            </p>

            {parse(item.html_string, {
              replace: (domNode) => {
                if (domNode.attribs && domNode.attribs.id === "predict_value") {
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
                        style={inputStyle}
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
        );
      })}
    </Wrapper>
  );
}

export default FillMissingValuesTable;

const Wrapper = styled.div`
  padding-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
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
`;

const Anomalie = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
