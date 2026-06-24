import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Anna Jose | AI/ML Developer & Full-Stack Java Engineer",
  description: "Explore the recruiter-optimized portfolio of Anna Jose, a B.Tech Computer Science student specializing in deep learning models (U-Net, CNNs) and Spring Boot full-stack applications.",
  keywords: [
    "Anna Jose",
    "AI/ML Developer",
    "Java Intern",
    "Spring Boot",
    "U-Net Segmentation",
    "Computer Science Portfolio",
    "Python Developer",
    "Mar Baselios College",
  ],
  authors: [{ name: "Anna Jose" }],
  openGraph: {
    title: "Anna Jose | AI/ML Developer & Full-Stack Java Engineer",
    description: "Explore the recruiter-optimized portfolio of Anna Jose, a B.Tech Computer Science student specializing in deep learning models (U-Net, CNNs) and Spring Boot full-stack applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-background text-foreground min-h-screen relative antialiased">
        {/* Cinematic Ambient Glow Orbs */}
        <div
          className="glow-orb w-[40vw] h-[40vw] bg-accent-violet/10 top-[-10%] left-[-10%] animate-pulse-slow"
          aria-hidden="true"
        />
        <div
          className="glow-orb w-[45vw] h-[45vw] bg-accent-cyan/5 top-[30%] right-[-10%] animate-pulse-slow"
          style={{ animationDelay: "-3s" }}
          aria-hidden="true"
        />
        <div
          className="glow-orb w-[35vw] h-[35vw] bg-accent-indigo/10 bottom-[10%] left-[5%] animate-pulse-slow"
          style={{ animationDelay: "-6s" }}
          aria-hidden="true"
        />

        {children}
      </body>
    </html>
  );
}
