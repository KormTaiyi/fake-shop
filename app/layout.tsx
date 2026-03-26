import type { Metadata } from "next";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fake Shop",
  description: "Small Next.js shop demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        suppressHydrationWarning
        className="min-h-full bg-slate-50 text-slate-900 antialiased"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-slate-900"
        >
          Skip to main content
        </a>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
          <NavBar />
          <main id="main-content" className="flex-1 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
