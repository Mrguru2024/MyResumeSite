import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://anthonymrgurufeaster.online"),
  title: {
    default:
      "Anthony 'Mrguru' Feaster | Full Stack Developer & Low Voltage Specialist",
    template: "%s | Anthony 'Mrguru' Feaster",
  },
  description:
    "Full Stack Developer, Locksmith Lead, and Low Voltage Specialist with expertise in JavaScript, TypeScript, Next.js, and hands-on technical solutions. View my interactive resume and portfolio.",
  keywords: [
    "Anthony Feaster",
    "Mrguru",
    "Full Stack Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Next.js Developer",
    "Low Voltage Specialist",
    "Locksmith Lead",
    "Technical Lead",
    "Web Development",
    "Software Engineer",
    "Portfolio",
    "Resume",
  ],
  authors: [{ name: "Anthony 'Mrguru' Feaster" }],
  creator: "Anthony 'Mrguru' Feaster",
  publisher: "Anthony 'Mrguru' Feaster",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anthonymrgurufeaster.online",
    siteName: "Anthony 'Mrguru' Feaster",
    title:
      "Anthony 'Mrguru' Feaster | Full Stack Developer & Low Voltage Specialist",
    description:
      "Full Stack Developer, Locksmith Lead, and Low Voltage Specialist with expertise in JavaScript, TypeScript, Next.js, and hands-on technical solutions.",
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Anthony 'Mrguru' Feaster - Full Stack Developer & Low Voltage Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Anthony 'Mrguru' Feaster | Full Stack Developer & Low Voltage Specialist",
    description:
      "Full Stack Developer, Locksmith Lead, and Low Voltage Specialist with expertise in JavaScript, TypeScript, Next.js, and hands-on technical solutions.",
    images: ["/og-image.jpg"], // Same image as OpenGraph
    creator: "@mrguru", // Your Twitter handle
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
    google: "your-google-site-verification", // Add your Google Search Console verification code
  },
  alternates: {
    canonical: "https://anthonymrgurufeaster.online",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        {/* Place your SoundToggle here for global floating sound control */}
        {children}
      </body>
    </html>
  );
}
