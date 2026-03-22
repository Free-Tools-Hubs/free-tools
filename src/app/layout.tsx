import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";

export const metadata: Metadata = {
  title: `${SITE_NAME} | 100+ Professional Online Tools`,
  description: SITE_DESCRIPTION,
  keywords: 'free tools, online tools, image editor, pdf tools, text utilities, developer tools, unit converter, currency converter, timezone calculator',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `${SITE_NAME} | 100+ Professional Online Tools`,
    description: SITE_DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
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
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T5QBX1LC61"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-T5QBX1LC61');
          `}
        </Script>
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
