import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASCII Art Generator | Create Stunning ASCII Instantly",
  description: "Turn text, images, and ideas into stunning ASCII art instantly. The fastest browser-based ASCII art platform.",
  keywords: ["ASCII art", "ASCII generator", "text to ASCII", "image to ASCII", "browser utility"],
  alternates: {
    canonical: "https://asciiartgenerator.com",
  },
  openGraph: {
    title: "ASCII Art Generator | Create Stunning ASCII Instantly",
    description: "Turn text, images, and ideas into stunning ASCII art instantly. The fastest browser-based ASCII art platform.",
    url: "https://asciiartgenerator.com",
    siteName: "ASCII Art Generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCII Art Generator | Create Stunning ASCII Instantly",
    description: "Turn text, images, and ideas into stunning ASCII art instantly. The fastest browser-based ASCII art platform.",
  },
  other: {
    "google-adsense-account": "ca-pub-6393936268623951"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ASCII Art Generator",
    "url": "https://asciiartgenerator.com",
    "description": "Turn text, images, and ideas into stunning ASCII art instantly. The fastest browser-based ASCII art platform.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All"
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-HZQ3QT11QC" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HZQ3QT11QC');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${jetBrainsMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
