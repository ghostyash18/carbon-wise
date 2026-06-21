import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EcoTrack | Discover Your Carbon Footprint",
  description: "A modern, educational, and motivational web platform to help users understand, track, and reduce their carbon emissions.",
  openGraph: {
    title: "EcoTrack | Shape a Greener Tomorrow",
    description: "Understand, track, and reduce your carbon footprint with our easy-to-use calculator and educational resources.",
    type: "website",
    locale: "en_US",
    siteName: "EcoTrack",
  },
};

import { SessionProvider } from "@/components/providers/session-provider";

import { ThemeProvider } from "@/components/providers/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
