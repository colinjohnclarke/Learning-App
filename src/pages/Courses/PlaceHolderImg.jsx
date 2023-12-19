import React from "react";

function PlaceHolderImg({ img }) {
  return (
    <div
      style={{
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "white",
        alignItems: "center",
        fontWeight: "500",
        height: "300px",
        width: "100%",
        marginTop: "70px",
        borderRadius: "5px",
        boxShadow: "0px 0px 30px 4px rgba(174, 196, 216, 0.25)",
      }}
    >
      <img
        style={{ height: "200px", width: "200px" }}
        src={img}
        alt="workinganimatedimage"
      />
      <p style={{ fontWeight: "400" }}>
        Hmm no courses yet! Search our courses..
      </p>
    </div>
  );
}

export default PlaceHolderImg;
