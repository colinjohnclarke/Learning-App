import React from "react";
import { BiHelpCircle } from "react-icons/bi";

function Hint(props) {
  const text = props.hint;

  const hintStyle = {
    boxShadow:
      "0 0 0 1px #6698cb inset, 0 0 0 2px rgba(255,255,255,0.15) inset, 0 8px 0 0 rgba(240, 137, 137, 0.34), 0 8px 0 1px rgba(220, 137, 137, 0.56),0 8px 8px 1px rgba(0,0,0,0.5)",

    backgroundColor: "rgba(240, 137, 137, 0.34)",
    display: "flex",
  };

  return (
    <Hint style={hintStyle}>
      <BiHelpCircle style={{ width: "70px" }} />
      <p>{text}</p>
    </Hint>
  );
}

export default Hint;
