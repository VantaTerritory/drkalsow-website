import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { buildJsonLd } from "@/lib/seo/schema";
import { getPage } from "@/lib/seo/pages";
import { Analytics, AnalyticsNoScript } from "@/components/tracking/analytics";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const home = getPage("/");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.meta.url),
  title: {
    default: home.title,
    template: `%s`,
  },
  description: home.description,
};

export const viewport: Viewport = {
  themeColor: "#3D2F4A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = buildJsonLd();
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        {jsonLd.map((node, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
          />
        ))}
      </head>
      <body>
        <AnalyticsNoScript />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
