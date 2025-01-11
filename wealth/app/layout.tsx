import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/header";
import React, { ReactNode } from "react";

// Import the Inter font
const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode; // Explicitly type the 'children' prop
}

// Metadata
export const metadata = {
  title: "Wealth", // Fixed typo in "Wleath"
  description: "One-stop shop for all your financial needs",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center">
              <p>© 2025 Wealth. All rights reserved.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}