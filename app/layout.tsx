import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./../providers/sessionprovider";
import React from "react";
import Account from "@/components/Account";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Train-You",
  description: "Online learning platform.learn and teach online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* @ts-ignore */}
      <AuthProvider>
        <body
          className={`${inter.className} flex flex-col min-h-screen max-w-[1340px] mx-auto`}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
