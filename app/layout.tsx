import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadataBase = new URL("https://orogud.com");

export const metadata: Metadata = {
  title: "OROGUD – 100% Organic & Ayurvedic Lifestyle Products",
  description:
    "OROGUD offers pure, natural and Ayurvedic products for a healthier lifestyle. Discover organic ghee, jaggery, herbs, skincare, wellness essentials and more.",
  keywords: [
    "OROGUD",
    "organic products",
    "ayurvedic products",
    "natural wellness",
    "herbal lifestyle",
    "organic ghee",
    "jaggery",
    "ayurveda",
    "herbal skincare",
  ],
  authors: [{ name: "OROGUD Team" }],
  robots: "index, follow",

  openGraph: {
    type: "website",
    title: "OROGUD – Pure Organic & Ayurvedic Products",
    description:
      "Experience the purity of Ayurveda with OROGUD. Explore 100% organic, natural and wellness-focused products crafted for healthy living.",
    url: "https://orogud.com",
    siteName: "OROGUD",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OROGUD Organic Ayurvedic Products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "OROGUD – Organic & Ayurvedic Lifestyle Products",
    description:
      "Discover pure organic and Ayurvedic essentials for a healthier lifestyle.",
    images: ["/og-image.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="terracotta">
       <head>
        {/* theme-color moved to a plain meta tag to avoid the unsupported metadata warning */}
        <meta name="theme-color" content="#3B7A3A" />
        {/* you can add other head-level meta tags here if needed */}
      </head>
      <body
        
      >
        <Header />
        <div className="px-8">
          {children}  
        </div>
        <Footer />
      </body>
    </html>
  );
}
