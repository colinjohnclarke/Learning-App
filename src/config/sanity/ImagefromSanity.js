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
      style={{ width: "350px", padding: "20px" }}
      src={imgurlFor(data.asset._ref)}
    />
  ) : null;

  return content;
}

export default ImagefromSanity;
