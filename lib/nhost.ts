import { NhostClient } from "@nhost/nhost-js";

export const nhost: NhostClient = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
});
