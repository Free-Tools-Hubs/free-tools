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
  keywords: [
    'online tools', 'free web utilities', 'professional micro tools', 'image editor online', 
    'pdf management tool', 'text formatting utility', 'developer toolbox', 'unit conversion online',
    'currency calculation', 'time zone world clock', 'batch image conversion', 'merge pdf files', 
    'json formatter', 'word counter', 'secure file tools', 'no registration web tools',
    'productivity hub', 'webmaster utilities', 'developer resources'
  ].join(', '),
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `${SITE_NAME} | 100+ Professional Online Tools`,
    description: SITE_DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    title: `${SITE_NAME} | 100+ Professional Online Tools`,
    description: SITE_DESCRIPTION,
    card: 'summary_large_image',
    images: ['/og.png'],
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
