import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkedIn",
  description: "Find Your Dream Developer Job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-w-[350px]`}>
        <NextTopLoader showSpinner={false} />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
