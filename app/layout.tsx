import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBaseUrl } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: 'swap',
});

import { getSiteConfig, getResumeData, getContactData } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  if (!siteConfig.metadata?.title) {
    throw new Error("Site configuration error: 'metadata.title' is required in site-config.json");
  }

  if (!siteConfig.metadata?.description) {
    throw new Error("Site configuration error: 'metadata.description' is required in site-config.json");
  }

  const baseUrl = getBaseUrl();

  return {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: siteConfig.metadata.title,
      description: siteConfig.metadata.description,
      url: baseUrl,
      siteName: siteConfig.metadata.title,
      locale: 'en_US',
      type: 'website',
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico' },
      ],
      apple: [
        { url: '/apple-touch-icon.png' },
      ],
    },
    manifest: '/site.webmanifest',
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zooming for accessibility
};

import MermaidLoader from "@/components/providers/MermaidLoader";
import { JsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@next/third-parties/google";
import { IconProvider } from "@/components/providers/IconProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();
  const resumeData = await getResumeData();
  const contactData = await getContactData();

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased text-foreground bg-background`}>
        <IconProvider>
          <Navbar
            title={siteConfig.metadata.title}
            navigation={siteConfig.navigation}
            visibility={siteConfig.visibility}
            resumeData={resumeData}
          />
          {children}
          <Footer
            data={siteConfig.footer}
            contacts={contactData.methods}
            visibility={siteConfig.visibility}
          />
          <MermaidLoader />
          <JsonLd />
          <GoogleAnalytics gaId="G-N92LKQB8QN" />
        </IconProvider>
      </body>
    </html>
  );
}
