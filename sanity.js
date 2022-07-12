import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "jo636kg0",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};

// RUN THIS TO ADD EXCEPTION FOR localhost 3000 CORS POLICY
// sanity cors add http://localhost:3000

export default client;
