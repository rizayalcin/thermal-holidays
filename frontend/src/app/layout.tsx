import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThermalHolidays | Luxury Wellness & Thermal Spa Retreats",
  description: "Discover the world's most exceptional thermal resorts and healing water destinations. Curated experiences for restoration and renewal.",
};

import { AuthProvider } from "@/contexts/AuthContext";
import WellnessConcierge from "@/components/hotel/WellnessConcierge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <WellnessConcierge />
        </AuthProvider>
      </body>
    </html>
  );
}
