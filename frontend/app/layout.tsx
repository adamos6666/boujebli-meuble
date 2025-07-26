import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TranslatedHeader from "./components/TranslatedHeader";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boujebli Meuble",
  description: "Meubles sur mesure et standards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TranslatedHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
