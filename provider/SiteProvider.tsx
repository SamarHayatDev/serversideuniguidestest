"use client";

import { fetchSite } from "@/lib/fetchSite";
import { useState, useEffect, createContext, useContext } from "react";

const SiteContext = createContext(null);

export const useSite = () => useContext(SiteContext);

const SiteProvider = ({ children }: { children: React.ReactNode }) => {
  const [siteData, setSiteData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSiteData = async () => {
      try {
        const { siteData } = await fetchSite("uniguides.flygency.com");

        if (!siteData) {
          console.warn("⚠️ No site data received!");
          return;
        }

        setSiteData(siteData);

        const primary =
          siteData?.brd_list?.[0]?.brd_details?.[0]?.primary_color || "Blue";
        const secondary =
          siteData?.brd_list?.[0]?.brd_details?.[0]?.secondary_color || "Black";
        const font = siteData?.brd_list?.[0]?.brd_details?.[0]?.font || "Inter";
        const favIcon = siteData?.brd_list?.[0]?.brd_details?.[0]?.fav_icon;

        if (favIcon) {
          const faviconUrl = `${process.env.NEXT_PUBLIC_NHOST_STORAGE_URL}${favIcon}`;

          let linkElement =
            document.querySelector("link[rel='icon']") ||
            document.createElement("link");
          linkElement.setAttribute("rel", "icon");
          linkElement.setAttribute("href", faviconUrl);
          document.head.appendChild(linkElement);
        }

        if (primary) {
          document.documentElement.style.setProperty(
            "--primary-color",
            primary
          );
        }
        if (secondary) {
          document.documentElement.style.setProperty(
            "--secondary-color",
            secondary
          );
        }

        if (font) {
          document.documentElement.style.setProperty("--primary-font", font);
          document.body.style.fontFamily = `${font}, sans-serif`;

          const fontUrl = `https://fonts.googleapis.com/css2?family=${font.replaceAll(
            " ",
            "+"
          )}&display=swap`;

          let existingLink = document.querySelector("link[data-font]");
          if (!existingLink) {
            const linkTag = document.createElement("link");
            linkTag.href = fontUrl;
            linkTag.rel = "stylesheet";
            linkTag.setAttribute("data-font", "true");
            document.head.appendChild(linkTag);
          } else {
            existingLink.setAttribute("href", fontUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching site data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSiteData();
  }, []);

  if (isLoading) return null;

  return (
    <SiteContext.Provider value={siteData}>{children}</SiteContext.Provider>
  );
};

export default SiteProvider;
