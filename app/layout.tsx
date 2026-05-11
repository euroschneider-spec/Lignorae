import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lignorae.com"),
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
  openGraph: {
    title: "LIGNORAE — Objects of Writing",
    description:
      "Sculptural objects of writing, handcrafted in Munich from wood, fire and form.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
