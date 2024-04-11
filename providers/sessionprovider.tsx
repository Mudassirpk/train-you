"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Session } from "next-auth";
import { Toaster } from "@/components/ui/toaster";

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <SessionProvider session={session}>
      {children}
      <Toaster />
    </SessionProvider>
  );
}
