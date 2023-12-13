import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";

const builder = imageUrlBuilder(sanityClient);

export const imgurlFor = (source) => {
  return builder.image(source);
};

export const myPortableTextComponents = {
  types: {
    image: (props) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={imgurlFor(props.value.asset).maxWidth(300)} alt="" />
      </div>
    ),
    marks: {
      // Ex. 1: custom renderer for the em / italics decorator
      em: ({ children }) => (
        <em className="text-gray-600 font-semibold">{children}</em>
      ),
    },
  },
};
