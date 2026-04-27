import type { Metadata } from "next";
import { Inter, Fira_Code, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/Footer";
import { getBaseUrl } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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

import MermaidLoader from "@/components/MermaidLoader";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@next/third-parties/google";

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
      <body className={`${inter.variable} ${firaCode.variable} ${spaceGrotesk.variable} font-sans antialiased text-foreground bg-background`}>
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
      </body>
    </html>
  );
}
