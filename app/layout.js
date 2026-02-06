//edpharma-webshop\app\layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/app/context/CartContext';
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from '@/app/context/WishlistContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
title: {
    default: "ED Pharma",
    template: "%s | ED Pharma",
  },
  description: "ED Pharma – Trusted Pharmaceutical Solutions",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <CartProvider>
          <WishlistProvider>
        {children}
        </WishlistProvider>
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
