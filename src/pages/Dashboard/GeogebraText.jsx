import React from "react";
import Geogebra from "react-geogebra";

function GeogebraText() {
  function onClickHandler() {
    const xCoord = 3.4;
    const yCoord = -1;
    const app = window.ggbApplet;
    app.evalCommand(`A=(${xCoord},${yCoord})`);
    //Check the GeoGebra API to get more information about evalCommand
  }

  return (
    <div style={{ position: "relative", zIndex: "200" }}>
      {" "}
      <Geogebra width="600" height="600" />
      <button type="button" onClick={onClickHandler}>
        Set 'A'
      </button>
      ;
    </div>
  );
}

export default GeogebraText;
