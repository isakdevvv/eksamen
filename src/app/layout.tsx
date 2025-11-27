import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";

const font = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PDF-oversikt",
  description: "Viser alle PDF-ene som ligger i prosjektets mappe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className={font.variable}>
      <body>{children}</body>
    </html>
  );
}
