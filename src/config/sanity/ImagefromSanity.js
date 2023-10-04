import React from "react";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";

function ImagefromSanity({ data }) {
  console.log("IMG data", data);
  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  return (
    <img
      alt=""
      style={{ width: "350px", padding: "20px" }}
      src={imgurlFor(data.asset._ref)}
    ></img>
  );
}

export default ImagefromSanity;
