import React, { useEffect, useState } from "react";
import Geogebra from "react-geogebra";

function Test({ material_id, id }) {
  // const [materialId, setMaterialId] = useState(material_id);
  // const [content, setContent] = useState(null);

  function handleResize() {
    // console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
  }

  window.addEventListener("resize", handleResize);

  let widthval = window.innerWidth;

  // useEffect(() => {
  //   handleResize();
  //   setContent(<Geogebra material_id={materialId} />);
  // }, []);

  handleResize();

  // let content = <Geogebra material_id={material_id} />;

  Geogebra.defaultProps = {
    id: material_id,
    // width: "340",
    showToolBar: false,
    showAlgebraInput: false,
    showMenuBar: false,
    showFullscreenButton: true,
  };

  let content = (
    <div>
      <Geogebra id={material_id} material_id={material_id} />
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "96.5vw",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {content}
    </div>
  );
}

export default Test;
