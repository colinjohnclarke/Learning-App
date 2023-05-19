import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "bkqykpjz",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

export default sanityClient;
