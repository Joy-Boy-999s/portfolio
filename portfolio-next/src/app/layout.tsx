import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import BackgroundGrid from "@/components/layout/BackgroundGrid";
import CustomCursor from "@/components/layout/CustomCursor";
import DynamicTitle from "@/components/layout/DynamicTitle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "B.Neeraj Kumar | Portfolio",
  description: "Hi there, I'm B.Neeraj Kumar. Aspiring Software Developer, Coder, and Creator.",
  keywords: ["B.Neeraj Kumar", "Portfolio", "Software Developer", "Coder", "React", "Next.js"],
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
