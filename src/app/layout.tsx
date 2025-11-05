import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JSONLD } from "@/components/SEO/JSONLD";
import { organizationSchema, websiteSchema } from "@/lib/schema";
// import { ThemeProvider } from "@/contexts/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Chatbot } from "@/components/chatbot/Chatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Azeem Lab - Transform Your Vision Into Powerful Digital Solutions",
    template: "%s | Azeem Lab"
  },
  description: "Expert web design, development, branding, and digital solutions. We turn ideas into exceptional digital experiences that drive growth.",
  keywords: "web design, web development, digital agency, UI/UX design, branding, e-commerce, custom software, digital marketing",
  authors: [{ name: "Azeem Lab" }],
  creator: "Azeem Lab",
  publisher: "Azeem Lab",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://testweb.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Azeem Lab',
    title: 'Azeem Lab - Transform Your Vision Into Powerful Digital Solutions',
    description: 'Expert web design, development, branding, and digital solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Azeem Lab Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SooooLab',
    creator: '@SooooLab',
    title: 'Azeem Lab - Transform Your Vision Into Powerful Digital Solutions',
    description: 'Expert web design, development, branding, and digital solutions.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JSONLD data={{
          '@context': 'https://schema.org',
          '@graph': [organizationSchema, websiteSchema],
        }} />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-background text-foreground transition-colors duration-300 overflow-x-hidden`}
      >
        <Header />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        <Footer />
        <Chatbot />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
