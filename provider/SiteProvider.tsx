import { fetchSite } from "@/lib/fetchSite";

const SiteProvider = async ({ children }: { children: React.ReactNode }) => {
  const { siteData } = await fetchSite("uniguides.flygency.com");

  if (!siteData) {
    console.warn("⚠️ No site data received!");
    return <>{children}</>;
  }

  const primary =
    siteData?.brd_list?.[0]?.brd_details?.[0]?.primary_color || "Blue";
  const secondary =
    siteData?.brd_list?.[0]?.brd_details?.[0]?.secondary_color || "Black";
  const font = siteData?.brd_list?.[0]?.brd_details?.[0]?.font || "Inter";
  const favIcon = siteData?.brd_list?.[0]?.brd_details?.[0]?.fav_icon;

  // Set dynamic styles
  const styleTag = `
    :root {
      --primary-color: ${primary};
      --secondary-color: ${secondary};
      --primary-font: ${font};
    }
    body { font-family: ${font}, sans-serif; }
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: styleTag }} />
        {favIcon && (
          <link
            rel="icon"
            href={`${process.env.NEXT_PUBLIC_NHOST_STORAGE_URL}${favIcon}`}
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
};

export default SiteProvider;
