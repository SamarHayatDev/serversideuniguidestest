import { GET_SITE } from "@/graphql/sites/Query";
import { client } from "./apolloClient";

export const fetchSite = async (host: string) => {
  const { data } = await client.query({
    query: GET_SITE,
    variables: { host },
    fetchPolicy: "network-only",
  });

  return { siteData: data || null };
};
