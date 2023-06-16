import React from "react";
import styled from "styled-components";
import SliderSelectionRandomise from "./SliderSelectionRandomise";

function SliderSelection(props) {
  const slidercontent = props.slider;
  console.log(
    "🚀 ~ file: SliderSelection.jsx:7 ~ SliderSelection ~ slidercontent:",
    slidercontent
  );

  return (
    <Wrapper>
      {slidercontent?.map((item, index) => {
        return (
          <SliderSelectionRandomise key={item._key} index={index} data={item} />
        );
      })}
    </Wrapper>
  );
}

export default SliderSelection;

const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 40px;
  // width: 100%;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: space-between;
`;
