import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import BackgroundGrid from "@/components/layout/BackgroundGrid";
import CustomCursor from "@/components/layout/CustomCursor";
import DynamicTitle from "@/components/layout/DynamicTitle";
import { siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "B. Neeraj Kumar (JoyBoy) — Full Stack Developer | React, NestJS, Spring Boot",
    template: "%s | B. Neeraj Kumar (JoyBoy)",
  },
  description:
    "Official portfolio of B. Neeraj Kumar (aka JoyBoy / Joy-Boy-999) — Full Stack Developer from India building scalable web apps with React.js, Next.js, NestJS, Spring Boot, and Node.js.",
  applicationName: "B. Neeraj Kumar Portfolio",
  authors: [{ name: "B. Neeraj Kumar", url: siteUrl }],
  creator: "B. Neeraj Kumar",
  publisher: "B. Neeraj Kumar",
  category: "technology",
  keywords: [
    "Neeraj",
    "Neeraj Kumar",
    "B Neeraj Kumar",
    "B. Neeraj Kumar",
    "Bondada Neeraj Kumar",
    "JoyBoy",
    "Joy Boy",
    "Joy-Boy-999",
    "joyboy developer",
    "neeraj portfolio",
    "neeraj kumar developer",
    "Full Stack Developer India",
    "React Developer",
    "NestJS Developer",
    "Spring Boot Developer",
    "Node.js Developer",
    "Next.js Developer",
    "TypeScript",
    "SDE",
    "Software Engineer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName: "B. Neeraj Kumar — Portfolio",
    title:
      "B. Neeraj Kumar (JoyBoy) — Full Stack Developer | React, NestJS, Spring Boot",
    description:
      "Portfolio of B. Neeraj Kumar (JoyBoy / Joy-Boy-999). Full Stack Developer building scalable web apps with React, Next.js, NestJS, Spring Boot, and Node.js.",
    locale: "en_IN",
    firstName: "Neeraj",
    lastName: "Kumar",
    username: "Joy-Boy-999s",
  },
  twitter: {
    card: "summary_large_image",
    title: "B. Neeraj Kumar (JoyBoy) — Full Stack Developer",
    description:
      "Portfolio of B. Neeraj Kumar (JoyBoy). Full Stack Developer — React, Next.js, NestJS, Spring Boot, Node.js.",
    creator: "@joyboy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // Fill these in after registering with Search Console / Bing Webmaster:
    // google: "your-google-site-verification-token",
    // other: { "msvalidate.01": "your-bing-verification-token" },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "B. Neeraj Kumar",
  alternateName: ["Neeraj Kumar", "JoyBoy", "Joy-Boy-999", "Joy Boy"],
  givenName: "Neeraj",
  familyName: "Kumar",
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer specializing in React.js, Next.js, NestJS, Spring Boot, and Node.js.",
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  email: "mailto:b.neerajkumar.999@gmail.com",
  nationality: "Indian",
  knowsAbout: [
    "React.js",
    "Next.js",
    "NestJS",
    "Spring Boot",
    "Node.js",
    "TypeScript",
    "MySQL",
    "Full Stack Development",
  ],
  sameAs: [
    "https://github.com/Joy-Boy-999s",
    "https://www.linkedin.com/in/b-neeraj-kumar/",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "B. Neeraj Kumar — Portfolio",
  alternateName: ["Neeraj Kumar Portfolio", "JoyBoy Portfolio"],
  url: siteUrl,
  author: { "@type": "Person", name: "B. Neeraj Kumar" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrains.variable} font-sans bg-background text-foreground antialiased min-h-screen`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <DynamicTitle />
        <BackgroundGrid />
        <CustomCursor />
        <Header />
        <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24">
          {children}
        </main>
      </body>
    </html>
  );
}
