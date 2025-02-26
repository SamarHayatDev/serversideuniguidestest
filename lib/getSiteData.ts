// lib/getSiteData.ts
import { fetchSite } from "@/lib/fetchSite";

export const getSiteData = async () => {
  const { siteData } = await fetchSite("uniguides.flygency.com");

  if (!siteData) {
    console.warn("⚠️ No site data received!");
    return null;
  }

  return {
    primary: siteData?.brd_list?.[0]?.brd_details?.[0]?.primary_color || "Blue",
    secondary:
      siteData?.brd_list?.[0]?.brd_details?.[0]?.secondary_color || "Black",
    font: siteData?.brd_list?.[0]?.brd_details?.[0]?.font || "Inter",
    favIcon: siteData?.brd_list?.[0]?.brd_details?.[0]?.fav_icon,
  };
};
