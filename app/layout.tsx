import type { Metadata } from "next";
import { Inter, Fira_Code, Space_Grotesk } from "next/font/google";
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

  return {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
  };
}

import MermaidLoader from "@/components/MermaidLoader";

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
      </body>
    </html>
  );
}
