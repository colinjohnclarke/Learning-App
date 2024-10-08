import React from "react";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";

function ImagefromSanity({ data }) {
  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const content = data ? (
    <img
      alt=""
      style={{
        maxWidth: "350px",
        maxHeight: "350px",
        minHeight: "100px",
        minWeight: "100px",
        padding: "20px",
        borderRadius: "16px",
      }}
      src={imgurlFor(data.asset._ref)}
    />
  ) : null;

  return content;
}

export default ImagefromSanity;
