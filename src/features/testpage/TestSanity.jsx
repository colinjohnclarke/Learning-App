import React, { useState, useEffect } from "react";
import sanityClient from "../../createclient";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

function TestSanity() {
  const [subjects, setSubjects] = useState(null);

  // const builder = imageUrlBuilder(sanityClient)

  // function urlFor(source) {
  //   return builder.image(source)
  // }

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "text_test"]`)
      .then((data) => setSubjects(data))
      .catch(console.error);
  }, []);
  console.log(subjects);
  //
  return (
    <div>
      <PortableText value={subjects}></PortableText>
    </div>
  );
}

export default TestSanity;
