import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";

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
      <body>
        <header className="site-header">
          <div className="shell">
            <Link href="/" className="brand">
              <span className="dot" aria-hidden />
              PDF & Cheatsheets
            </Link>
            <nav className="nav">
              <Link href="/">PDF-oversikt</Link>
              <Link href="/cheatsheets/comprehensive">Comprehensive Python</Link>
              <Link href="/cheatsheets/best">Best Python Cheat Sheet</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
