import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import { OrganizationSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lignorae.com"),
  title: {
    default: "LIGNORAE — Objects of Writing",
    template: "%s | LIGNORAE",
  },
  description:
    "LIGNORAE creates sculptural objects of writing in Munich: handcrafted fountain pens and cocoon presentation forms shaped by fire, wood and presence.",
  keywords: [
    "LIGNORAE",
    "objects of writing",
    "handcrafted fountain pens",
    "wooden fountain pens",
    "Munich atelier",
    "sculptural writing instruments",
    "yakisugi fountain pen",
  ],
  authors: [{ name: "LIGNORAE" }],
  creator: "LIGNORAE",
  publisher: "LIGNORAE",
  applicationName: "LIGNORAE",
  category: "Design objects",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      de: "/de",
      ro: "/ro",
      "x-default": "/",
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "LIGNORAE Atelier",
    description:
      "Sculptural objects of writing, handcrafted in Munich from wood, fire and form.",
    url: "https://www.lignorae.com",
    siteName: "LIGNORAE",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LIGNORAE sculptural objects of writing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LIGNORAE — Objects of Writing",
    description:
      "Sculptural objects of writing, handcrafted in Munich from wood, fire and form.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OrganizationSchema />
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
