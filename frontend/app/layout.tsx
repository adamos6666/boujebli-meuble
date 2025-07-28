import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TranslatedHeader from "./components/TranslatedHeader";
import Footer from "./components/Footer";
import { AccessibilityEnhancer } from "./components/AccessibilityEnhancer";
import { PerformanceMonitor } from "./components/PerformanceMonitor";
import AuthDebug from "./components/AuthDebug";
import ForceAuth from "./components/ForceAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boujebli Meuble - Meubles sur mesure",
  description: "Découvrez nos meubles sur mesure de qualité. Cuisines, dressings, portes et plus encore.",
  keywords: "meubles, sur mesure, cuisine, dressing, portes, Tunisie",
  authors: [{ name: "Boujebli Meuble" }],
  creator: "Boujebli Meuble",
  publisher: "Boujebli Meuble",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://boujebli-meuble.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Boujebli Meuble - Meubles sur mesure",
    description: "Découvrez nos meubles sur mesure de qualité. Cuisines, dressings, portes et plus encore.",
    url: "https://boujebli-meuble.vercel.app",
    siteName: "Boujebli Meuble",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Boujebli Meuble - Meubles sur mesure",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boujebli Meuble - Meubles sur mesure",
    description: "Découvrez nos meubles sur mesure de qualité. Cuisines, dressings, portes et plus encore.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TranslatedHeader />
        <main>{children}</main>
        <Footer />
        <AccessibilityEnhancer />
        <PerformanceMonitor />
        <AuthDebug />
        <ForceAuth />
      </body>
    </html>
  );
}
