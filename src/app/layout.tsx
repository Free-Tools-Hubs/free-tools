import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freetoolshubs.com';

export const metadata: Metadata = {
  title: "Free Tools Hub | 100+ Professional Online Tools",
  description: "Access a hub of 100+ free online tools for image processing, PDF management, development, and more. Fast, secure, and privacy-focused.",
  keywords: 'free tools, online tools, image editor, pdf tools, text utilities, developer tools, unit converter, currency converter, timezone calculator',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free Tools Hub | 100+ Professional Online Tools',
    description: 'Access a hub of 100+ free online tools for image processing, PDF management, development, and more. Fast, secure, and easy to use.',
    type: 'website',
    url: siteUrl,
    siteName: 'Free Tools Hub',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Free Tools Hub',
      },
    ],
  },
  twitter: {
    title: 'Free Tools Hub | 100+ Professional Online Tools',
    description: 'Access a hub of 100+ free online tools for image processing, PDF management, development, and more. Fast, secure, and easy to use.',
    card: 'summary_large_image',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
