import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Tools Hub | 100+ Pro Online Tools",
  description: "Access a hub of 100+ free online tools for image processing, PDF management, development, and more. Fast, secure, and easy to use.",
  keywords: 'free tools, online tools, image tools, pdf tools, text tools, development tools',
  openGraph: {
    title: 'Free Tools Hub | 100+ Pro Online Tools',
    description: 'Access a hub of 100+ free online tools for image processing, PDF management, development, and more. Fast, secure, and easy to use.',
    type: 'website',
    url: 'https://free-tools-steel.vercel.app',
    siteName: 'Free Tools',
    images: [
      {
        url: 'https://free-tools-steel.vercel.app/logo.png',
        width: 1200,
        height: 630,
        alt: 'Free Tools Hub | 100+ Pro Online Tools',
      },
    ],
  },
  twitter: {
    title: 'Free Tools Hub | 100+ Pro Online Tools',
    description: 'Access a hub of 100+ free online tools for image processing, PDF management, development, and more. Fast, secure, and easy to use.',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://free-tools-steel.vercel.app/logo.png',
        width: 1200,
        height: 630,
        alt: 'Free Tools Hub | 100+ Pro Online Tools',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
