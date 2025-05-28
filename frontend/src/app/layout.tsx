import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ClientErrorBoundary } from "@/components/ClientErrorBoundary";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProjectShelf - Portfolio Platform for Creators",
  description: "Create dynamic portfolios with modular case studies for designers, developers, and writers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
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
