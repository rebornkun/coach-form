import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/satoshi/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});
const helvetica_compressed = localFont({
  src: [
    {
      path: "./fonts/helveticacompressed/Helvetica-Compressed.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-compressed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chicago Giants | Fan Coach Application",
  description: "Apply to become a fan coach for Willy Adames with the Chicago Giants baseball team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${helvetica_compressed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
