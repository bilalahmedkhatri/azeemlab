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
import { ChatbotLoader } from "@/components/chatbot/ChatbotLoader";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: 'swap',
  preload: true,
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.azeemlab.com'),
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
    site: '@AzeemLab',
    creator: '@AzeemLab',
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
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://vercel-insights.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />

        <JSONLD data={{
          '@context': 'https://schema.org',
          '@graph': [organizationSchema, websiteSchema],
        }} />

        {/* Google Analytics (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-C3NLM4SBTQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-C3NLM4SBTQ');
          `}
        </Script>

        {/* <Script id="ahrefs-analytics">
          {`
            var ahrefs_analytics_script = document.createElement('script');
            ahrefs_analytics_script.async = true;
            ahrefs_analytics_script.src = 'https://analytics.ahrefs.com/analytics.js';
            ahrefs_analytics_script.setAttribute('data-key', 'iXDHuq+9nTFqxjfb000nhw');
            document.getElementsByTagName('head')[0].appendChild(ahrefs_analytics_script);
          `}
        </Script> */}

        <script src="https://analytics.ahrefs.com/analytics.js" data-key="iXDHuq+9nTFqxjfb000nhw" async></script>

      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-background text-foreground transition-colors duration-300 overflow-x-hidden`}
      >
        <Header />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        <Footer />
        <ChatbotLoader />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
