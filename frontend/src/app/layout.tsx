'use client';

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ClientErrorBoundary } from "@/components/ClientErrorBoundary";
import { Toaster } from "@/components/ui/toast";
import { useEffect } from 'react';
import { pingBackend } from '@/lib/api';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Ping the backend immediately when the component mounts
    pingBackend();

    // Set up an interval to ping the backend every minute (60000 milliseconds)
    const intervalId = setInterval(() => {
      pingBackend();
    }, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-gray-50 font-sans antialiased`}>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <ClientErrorBoundary>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </ClientErrorBoundary>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
