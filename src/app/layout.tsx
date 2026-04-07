import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const suite = localFont({
  src: "./SUITE-Variable.woff2",
  variable: "--font-suite",
  display: "swap",
});

export const metadata: Metadata = {
  title: "조서현 포트폴리오",
  description: "풀스택 개발자 조서현의 포트폴리오입니다.",
  openGraph: {
    title: "조서현 포트폴리오",
    description: "풀스택 개발자 조서현의 포트폴리오입니다.",
    url: "https://csh1668.github.io",
    siteName: "조서현 포트폴리오",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${suite.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
