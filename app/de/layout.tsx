import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://lignorae.com"),
  title: {
    default: "LIGNORAE Atelier",
    template: "%s | LIGNORAE Atelier",
  },
  description:
    "Handcrafted fountain pens made in Munich from carefully selected woods, shaped slowly and crafted by hand.",
  keywords: [
    "LIGNORAE",
    "fountain pens",
    "handcrafted fountain pens",
    "wooden fountain pens",
    "Munich atelier",
    "luxury writing instruments",
  ],
  authors: [{ name: "LIGNORAE Atelier" }],
  creator: "LIGNORAE Atelier",
  openGraph: {
    title: "LIGNORAE Atelier",
    description:
      "Handcrafted fountain pens made in Munich from carefully selected woods.",
    siteName: "LIGNORAE Atelier",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LIGNORAE Atelier handcrafted fountain pens",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
