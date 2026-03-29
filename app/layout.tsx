import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

import { getSiteConfig } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  if (!siteConfig.metadata?.title) {
    throw new Error("Site configuration error: 'metadata.title' is required in site-config.json");
  }

  if (!siteConfig.metadata?.description) {
    throw new Error("Site configuration error: 'metadata.description' is required in site-config.json");
  }

  return {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();
  
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased text-foreground bg-background`}>
        <Navbar visibility={siteConfig.visibility} />
        {children}
        <Footer data={siteConfig.footer} visibility={siteConfig.visibility} />
      </body>
    </html>
  );
}
