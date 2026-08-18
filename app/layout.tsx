import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SessionProvider from "@/components/SessionProvider";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import FeaturedEventBanner from "@/components/FeaturedEventBanner";

export const metadata: Metadata = {
  title: "LPU Space Club | Centre for Space Science",
  description: "Building the next generation of space scientists, engineers, and innovators at Lovely Professional University.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <SessionProvider>
            <Navbar />
            {/* mt-16 pushes below the fixed navbar (navbar is ~64px tall) */}
            <div className="mt-16">
              <AnnouncementBanner />
              <FeaturedEventBanner />
            </div>
            <main>{children}</main>
            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
