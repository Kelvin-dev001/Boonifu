import type { Metadata } from "next";
import "./globals.css";

// Import Google Fonts using next/font (for best performance)
import { Poppins, Quicksand } from "next/font/google";

// Set up Poppins and Quicksand with Latin subset and variable font
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const quicksand = Quicksand({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boonifu – Instant Posters for African Businesses",
  description:
    "Effortlessly create beautiful posters and social media designs for your African business using AI. Pay via M-Pesa. Try Boonifu now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${quicksand.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}